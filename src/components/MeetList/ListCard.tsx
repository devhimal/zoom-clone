import React from "react"
import Image from "next/image"
import clsx from "clsx"

interface Cards {
  url: string
  title: string
  desc: string
  classNames: string
  handleClick?: any
}
const ListCard = ({ url, title, desc, classNames, handleClick }: Cards) => {
  return (
    <div
      className={clsx(
        "min-h-[260px] min-w-[260px] rounded-md flex justify-between flex-col px-4 py-8",
        classNames
      )}
    >
      <section onClick={handleClick}>
        <Image src={url} width={24} height={24} alt={title} />
      </section>
      <section>
        <h2 className="font-extrabold">{title}</h2>
        <p>{desc}</p>
      </section>
    </div>
  )
}

export default ListCard
