import os
import torch
from PIL import Image
from torch.utils.data import Dataset
from torchvision.transforms import Compose, Resize, ToTensor
from torch.utils.data import DataLoader
from scipy.stats import mode
import pickle
import numpy as np

def predict_output():
    class CustomImageDataset(Dataset):
            def __init__(self, image_dir, transform=None):
                self.image_dir = image_dir
                self.image_files = [f for f in os.listdir(image_dir) if f.endswith('.jpg')]
                self.transform = transform

            def __len__(self):
                return len(self.image_files)

            def __getitem__(self, idx):
                img_name = os.path.join(self.image_dir, self.image_files[idx])
                image = Image.open(img_name).convert('RGB')
                
                if self.transform:
                    image = self.transform(image)
                
                return image  # No labels since it's inference

        # Define transformations for inference
    test_transformations = Compose([
            Resize((256, 256)),  # Resize to the expected input size
            ToTensor(),  # Convert to tensor
        ])

        # Provide the path to the directory containing images for inference
    image_dir = './public'

        # Create dataset for inference
    test_dataset = CustomImageDataset(image_dir,test_transformations)

        # Create DataLoader for inference
    test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)

        # print(test_dataset[0])

    with open('./model.pkl','rb') as f:
            model = pickle.load(f)
        # Iterate through the dataset and run inference


    all_outputs = []

    for images in test_loader:
            # Run inference using your model
            output = model(images)
            
            output = torch.sigmoid(output).detach().cpu().numpy()

            all_outputs.append(output)
    all_outputs_flat = np.concatenate(all_outputs)
    final_output = mode(all_outputs_flat,axis = None)[0]
    return (final_output>0.5)


    

