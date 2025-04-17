'use client';

import { Dialog } from '@headlessui/react';
import { X, Upload, Paperclip, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComposeDrawer({ isOpen, onClose }: Props) {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [fileSizeExceeded, setFileSizeExceeded] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const totalSize = selected.reduce((sum, file) => sum + file.size, 0);
    setFileSizeExceeded(totalSize > 20 * 1024 * 1024);
    if (totalSize <= 20 * 1024 * 1024) {
      setFiles(selected);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    const totalSize = updatedFiles.reduce((sum, file) => sum + file.size, 0);
    setFileSizeExceeded(totalSize > 20 * 1024 * 1024);
    setFiles(updatedFiles);
  };

  const handleSend = () => {
    if (fileSizeExceeded) return;
    setBody(bodyRef.current?.innerHTML || '');
    console.log({ recipients, subject, body: bodyRef.current?.innerHTML || '', files });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 max-w-xl w-full bg-white shadow-xl overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <Dialog.Title className="text-xl font-semibold text-gray-900">New Message</Dialog.Title>
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Recipients */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">To:</label>
                <input
                  type="text"
                  placeholder="user@example.com, another@example.com"
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Subject:</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Body */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Message:</label>
                <div
                  ref={bodyRef}
                  contentEditable
                  className="min-h-[200px] p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              </div>

              {/* Attachments */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Attachments:</label>
                
                {/* File Input Button */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Paperclip className="w-4 h-4" />
                    Add Files
                  </button>
                  
                  {files.length > 0 && (
                    <span className="text-sm text-gray-500">
                      {files.length} {files.length === 1 ? 'file' : 'files'} selected
                    </span>
                  )}
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*,application/pdf,.doc,.docx,audio/*"
                  className="hidden"
                />

                {/* File List */}
                {files.length > 0 && (
                  <ul className="mt-2 space-y-2">
                    {files.map((file, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md border border-gray-200"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Paperclip className="flex-shrink-0 w-4 h-4 text-gray-400" />
                          <span className="truncate text-sm">{file.name}</span>
                          <span className="text-xs text-gray-500 ml-auto">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                        <button 
                          onClick={() => removeFile(idx)} 
                          className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                )}

                {fileSizeExceeded && (
                  <p className="text-sm text-red-500 mt-1">
                    Total attachment size exceeds 20MB limit
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Discard
                </button>
                <button
                  onClick={handleSend}
                  disabled={fileSizeExceeded}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}