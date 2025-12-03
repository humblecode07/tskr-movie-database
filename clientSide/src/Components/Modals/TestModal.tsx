const TestModal = ({ onClose } : any) => {
   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
         <div className="bg-white p-6 rounded-lg shadow-lg">
            <button onClick={onClose} className="mb-4 text-red-500">Close</button>
            <h2 className="text-lg font-bold">Modal Title</h2>
            <p>This is the modal content.</p>
         </div>
      </div>
   )
}

export default TestModal
