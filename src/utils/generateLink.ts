export default function generateLink(
  path: string,
  params?: { [key: string]: string | number } | undefined
) {
  let link = path
  if (params) {
    Object.keys(params).forEach((key: string) => {
      link = link.replace(`:${key}`, `${params?.[key] || ''}`)
    })
  }

  return link
}
