import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white py-8 ">
        <div className="container mx-auto text-center">
          <p className="text-lg">© 2024 SwapSense AI. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            {['Contact Us', 'Privacy Policy'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm hover:text-blue-300 transition-colors duration-300">{item}</a>
            ))}
          </div>
        </div>
      </footer>
  )
}

export default Footer
