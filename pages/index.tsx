import { Input, Button } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { TopMenu } from '../Components/TopMenu';
import { Wrapper } from './style';



export default function Home() {
  const [value, setValue] = useState('')

  return <Wrapper>
    <TopMenu />
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
    <div>
      <Button type="primary">Primary Button</Button>
    </div>
  </Wrapper>
}
