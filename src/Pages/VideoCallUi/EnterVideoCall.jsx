function EnterVideoCall() {
  return (
    <>
      <div className="flex items-center justify-center text-center flex-col">
        <h1 className="text-3xl font-bold m-4">Enter to Video Call</h1>
        <label htmlFor="email">Enter your Email</label>
        <input type="email" placeholder="email" name="email" id="email" className="border-2 border-black rounded p-1"/>
        <label htmlFor="roomId">Enter Room ID</label>
        <input type="text" placeholder="Room ID" name="roomId" id="roomId" className="border-2 border-black rounded p-1"/>
        <button className="bg-green-400 text-black rounded p-2 mt-2 hover:cursor-pointer">Enter Room</button>
      </div>
    </>
  );
}

export default EnterVideoCall;
