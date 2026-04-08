import DOMPurify from 'dompurify'

export interface SafeHtmlProps extends React.HTMLAttributes<HTMLDivElement> {
  html: string
}

const Index = ({ html, ...props }: SafeHtmlProps) => {
  const sanitizedHtml = DOMPurify.sanitize(html)
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} {...props} />
}

export default Index
