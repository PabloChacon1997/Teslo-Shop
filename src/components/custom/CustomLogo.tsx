import { Link } from "react-router"

interface Props {
  subtitle?: string;
}

export const CustomLogo = ({ subtitle = 'Shop' }: Props ) => {
  return (
    <Link to='/' className="flex items-center whitespace-nowrap">
      <span className="font-monserrat font-bold text-sl m-o whitespace-nowrap">
        Teslo | 
      </span>
      <p className="text-muted-foreground m-0 px-2 whitespace-nowrap">
        {subtitle}
      </p>
    </Link>
  )
}
