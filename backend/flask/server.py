import socketio
from flask import Flask
import h5py
import numpy as np
import cv2
import os,shutil
from model import predict_output

# function to capture frames using opencv
def FrameCapture(path, output_dir='./public', size=(256, 256)):
    # Create the output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Open the video file
    vidObj = cv2.VideoCapture(path)
    count = 0
    success = True

    while success:
        success, image = vidObj.read()
        if success:
            # Resize the frame
            image_resized = cv2.resize(image, (size[0], size[1]))

            # Crop the frame to 256x256 if necessary
            # Ensure the frame size is at least 256x256
            if image_resized.shape[0] > size[1] and image_resized.shape[1] > size[0]:
                start_x = (image_resized.shape[1] - size[0]) // 2
                start_y = (image_resized.shape[0] - size[1]) // 2
                image_cropped = image_resized[start_y:start_y + size[1], start_x:start_x + size[0]]
            else:
                # If the frame is smaller than 256x256, just use the resized image
                image_cropped = image_resized

            # Save the frame as a JPEG file
            cv2.imwrite(f"{output_dir}/frame{count}.jpg", image_cropped)
            count += 1

    # Release the video object
    vidObj.release()
    print(f"Frames extracted and processed: {count}")

def convertToHD5():
    video_path = 'sample.mp4'
    cap = cv2.VideoCapture(video_path)
    hdf5_path = 'output.h5'
    hdf5_file = h5py.File(hdf5_path, 'w')
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)

    dataset = hdf5_file.create_dataset('video_frames', 
                                    shape=(frame_count, frame_height, frame_width, 3),
                                    dtype=np.uint8)

    # Read and store each frame in the HDF5 file
    for i in range(frame_count):
        ret, frame = cap.read()
        if ret:
            dataset[i] = frame
        else:
            break

    # Store additional metadata like FPS
    hdf5_file.attrs['fps'] = fps

    # Release resources
    cap.release()
    hdf5_file.close()

    print(f"Video has been successfully converted to {hdf5_path}")

app = Flask(__name__)
@app.get('/')
def home():
    return "hi"

# Create a new Socket.IO client
sio = socketio.Client()

# Define event handlers
@sio.event
def connect():
    print('Connected to Node.js server')
@sio.event
def disconnect():
    print('Disconnected from Node.js server')

@sio.event
def process_video(data):
    FrameCapture('../public/temp/'+data, './public', size=(256, 256))
    result = predict_output()
    # process the videos using model
    print(result)
    if(result==True):
        sio.emit('data',{'data': '1'})
    else:
        sio.emit('data',{'data': '0'})
        shutil.rmtree('./public')
        os.mkdir('./public')

# Connect to the Node.js server
sio.connect('http://localhost:8000')

# Optionally emit messages to the Node.js server
sio.emit('message_from_flask', {'data': 'Hello from Flask!'})
# Run the Flask app
if __name__ == '__main__':
    socketio.run(app, port=5000)
