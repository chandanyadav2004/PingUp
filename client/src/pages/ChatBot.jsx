import { useEffect, useRef, useState } from "react";
import { dummyMessagesData, dummyUserData } from "../assets/assets";
import { ImageIcon, SendHorizonal } from "lucide-react";

const ChatBot = () => {
  const messsages = dummyMessagesData;
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(dummyUserData);

  const messagesEndRef = useRef(null);

  const sendMessage = async () => {};
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messsages]);

  return (
    user && (
      <div className=" flex flex-col h-screen">
        <div className=" flex items-center gap-2 p-2 md:px-10 xl:pl-24 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-300 ">
          <img
            src={user.profile_picture}
            className=" size-8 rounded-full"
            alt=""
          />
          <div className="">
            <p className=" font-medium">{user.full_name}</p>
            <p className=" text-sm text-gray-500 -mt-1.5">@{user.username}</p>
          </div>
        </div>

        <div className=" p-5 md:px-10 h-full overflow-y-scroll">
          <div className=" space-y-4 max-w-4xl mx-auto">
            {messsages
              .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((message, index) => (
                <div
                  className={` flex flex-col ${
                    message.to_user_id !== user._id
                      ? " items-start"
                      : " items-end"
                  }`}
                  key={index}
                >
                  <div
                    className={` p-2 text-sm max-w-sm bg-white text-slate-700 rounded-lg shadow ${
                      message.to_user_id !== user._id
                        ? "rounded-bl-none"
                        : " rounded-br-none"
                    }`}
                  >
                    {message.message_type === "image" && (
                      <img
                        src={message.media_url}
                        className="  w-full max-w-sm rounded-lg mb-1"
                        alt=""
                      />
                    )}

                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className=" px-4">
          <div className=" flex items-center gap-3 pl-5 p-1.5 bg-white w-full max-w-xl mx-auto border border-gray-200 shadow rounded-full mb-5">
            <input
              type="text"
              name=""
              className=" flex-1 outline-none text-slate-700"
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              onChange={(e) => setText(e.target.value)}
              value={text}
              id=""
            />
            <label htmlFor="image">
              {
                image ? <img src={URL.createObjectURL(image)} className=" h-8 rounded " alt="" /> : <ImageIcon className=" size-7 cursor-pointer text-gray-700" />
              }
              <input type="file" name="" id="image" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])} />
            </label>
            <button onClick={sendMessage} className=" bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 cursor-pointer text-white p-2 rounded-full">
              <SendHorizonal size={18}  />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ChatBot;
