import {cn} from "../lib/utils/cn.ts";
import type {ReactNode} from "react";
import * as React from "react";

export type CardProps = {
	children?: ReactNode;
	className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
	return (
		<div className={cn("card bg-base-100 w-96 shadow-sm", className)}>
			{children}
		</div>
	)
}