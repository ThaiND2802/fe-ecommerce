const Index = ({ src, ref }: { src: string; ref?: React.RefObject<HTMLIFrameElement> }) => {
  return (
    <iframe
      ref={ref}
      title="print"
      style={{ border: 'none', width: '100%', height: '100%' }}
      src={src}
    />
  )
}

export default Index
