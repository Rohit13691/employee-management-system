import React from 'react'
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from 'react-icons/fa6'

export const FooterComponent = () => {
    return (
        <footer className="w-full bg-black shadow-lg text-white py-6 px-4">
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-5xl mx-auto">
                
                {/* Brand */}
                <p className=" text-gray-400 text-sm font-semibold">Employee Management System</p>

                {/* Copyright */}
                <p className="text-gray-400 text-sm">© 2026 All rights reserved</p>

                {/* Social Media Links */}
                <div className="flex gap-5">
                    <span className="text-gray-400 text-sm">Follow us on :</span>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition text-xl">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition text-xl">
                        <FaLinkedin />
                    </a>
                    <a href="https://x.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition text-xl">
                        <FaXTwitter />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500 transition text-xl">
                        <FaInstagram />
                    </a>
                </div>

            </div>

        </footer>
    )
}
