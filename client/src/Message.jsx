
function Message({message}) {
  return (
    <div className="message">
    <h3>Message:</h3>
    <p>{message?.message}</p>
  </div>
  )
}

export default Message