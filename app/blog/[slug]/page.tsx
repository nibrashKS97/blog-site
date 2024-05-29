export default function BlogArticle({params}: {params:{slug:string}}) {
    return (
        <h1>{params.slug}</h1>
    )

}

*[_type == "blog" && slug.current == 'positive-work-culture']{
    "currentSlug": slug.current,
      title,
      content,
      titleImage,
  }[0]