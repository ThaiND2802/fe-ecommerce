import { useNavigate } from 'react-router-dom'
import CollapseButton from 'src/lib/components/CollapseButton'
import IconSax from 'src/lib/components/IconSax'

const TopButtons = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate()

  return (
    <CollapseButton
      collapsed={collapsed}
      title={'button'}
      onClick={() => {
        navigate('/')
        setTimeout(() => {
          console.log('button event')
        }, 500)
      }}
      style={{
        marginLeft: '4px',
      }}>
      <IconSax name="download-2" size={18} />
      <span className="button-text">{'button'}</span>
    </CollapseButton>
  )
}

export default TopButtons
