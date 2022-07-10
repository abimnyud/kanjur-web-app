import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { pathToRegexp } from 'path-to-regexp';

interface Props {
    href: string;
    as?: string;
    exact?: string;
    activeClassName?: string;
    children?: React.ReactNode;
}
const NavLink: React.FC<Props> = ({
    href,
    as,
    exact,
    activeClassName,
    children,
    ...props
}: Props) => {
    const { asPath } = useRouter();
    const isActive = pathToRegexp(as || href, [], {
        sensitive: true,
        end: !!exact,
    }).test(asPath);

    const child: any = React.Children.only(children);
    const className = (
        (child?.props.className || '') +
        ' ' +
        (isActive ? activeClassName : '')
    ).trim();

    return (
        <Link href={href} as={as} {...props}>
            {React.cloneElement(child, { className })}
        </Link>
    );
};

export default NavLink;
