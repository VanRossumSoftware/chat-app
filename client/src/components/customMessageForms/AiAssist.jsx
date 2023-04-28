import { useEffect, useState } from 'react'
import MessageFormUI from './MessageFormUI'
import { usePostAiAssistMutation } from '../state/api';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value, delay])

    return debouncedValue;
}

const AiAssist = ({props, activeChat}) => {
  //console.log("activeChat", activeChat)
  //console.log("props", props)
  const [message, setMessge] = useState("");
  const [attachment, setAttachment] = useState("");
  const [appendText, setAppendText] = useState("");
  const [triggerAssist, resultAssist] = usePostAiAssistMutation();

  const handleChange = (e) => setMessge(e.target.value);

  const handleSubmit = async () => {
    const date = new Date().toISOString().replace("T", " ").replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
      const att = attachment ? [{blob: attachment, file: attachment.name}] : [];
      const form = {
        attachments: att,
        created: date,
        sender_username: props.username,
        text: message,
        activeChatId: activeChat.id
      }

      props.onSubmit(form);
      setMessge("");
      setAttachment("");
  };

  const debouncedValue = useDebounce(message, 2000);

  useEffect(() => {
    console.log("useEffect - debounce");
    if (debouncedValue) {
        console.log("activeChat", activeChat);
        const form = { text: message,
          activeChatId: activeChat.id
        };

        triggerAssist(form);

        console.log("trigger assist: ", triggerAssist);
        console.log("result assist: ", resultAssist);
    }
  }, [debouncedValue]); //eslint-disable-line

  const handleKeyDown = (e) => {
    if (e.keyCode === 9) { //Handle Tab
      //Auto complete
      console.log("Pressed Tab");
      e.preventDefault();
      setMessge(`${message} ${appendText}`)
    } else if (e.keyCode === 13) {  //Handle Enter
      //Submit
      console.log("Pressed Enter");
      handleSubmit();
    }
    setAppendText("");
  }

  useEffect(() => {
    console.log("useEffect - result assist: ", resultAssist);
    if (resultAssist.data) {
      console.log("useEffect - result assist exists");
      setAppendText(resultAssist.data);
    }
  }, [resultAssist]); //eslint-disable-line

  return (
    <div>
      <MessageFormUI 
        setAttachment = {setAttachment}
        message = {message}
        handleChange = {handleChange}
        handleSubmit = {handleSubmit}
        appendText={appendText}
        handleKeyDown={handleKeyDown}
      />
    </div>
  )
};

export default AiAssist;