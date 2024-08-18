
export default function Queue({queue, onClick}) {
  return (
    <li key={queue?.name}>
    {queue?.name} - {queue?.messageCount} messages
    <button className='btn' onClick={() => onClick(queue?.name)}>Select</button>
  </li>
  )
}
