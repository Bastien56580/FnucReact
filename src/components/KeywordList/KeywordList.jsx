import { useState } from 'react'

export default function KeywordList({data}) {
  const list = data.map(d => <KeywordItem key={data.indexOf(d)}word={d}/>)
  return (
    <div>{list}</div>
  )
}

function KeywordItem({word}) {
    const [checked,setChecked] = useState(false);
    return <><button onClick={() => setChecked(!checked)}>{checked ? '☑':'☐'}</button><ul>{word}</ul></>
}
