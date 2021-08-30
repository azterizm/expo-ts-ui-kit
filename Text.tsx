import React from "react";
import { Animated, StyleSheet, Text, TextProps } from "react-native";

import expoTheme from "./theme";
import { mergeTheme, getMargins, getPaddings } from "./utils/index";

type Transform = 'none' | 'uppercase' | 'lowercase' | 'capitalize'

type TypographyProps = TextProps & Partial<{
	h1: boolean,
	h2: boolean,
	h3: boolean,
	title: boolean,
	subtitle: boolean,
	caption: boolean,
	small: boolean,
	size: number | string,
	transform: Transform,
	regular: boolean,
	bold: boolean,
	semibold: boolean,
	medium: boolean,
	weight: string | number,
	light: boolean,
	center: boolean,
	right: boolean,
	spacing: number,
	height: number,
	color: string,
	primary: boolean,
	secondary: boolean,
	tertiary: boolean,
	black: boolean,
	white: boolean,
	gray: boolean,
	error: boolean,
	warning: boolean,
	success: boolean,
	info: boolean,
	animated: boolean,
	theme: boolean,
	style: any,
	children: any,
	margin: boolean | number | string | object,
	marginHorizontal: boolean | number | string,
	marginVertical: boolean | number | string,
	marginTop: boolean | number | string,
	marginBottom: boolean | number | string,
	marginLeft: boolean | number | string,
	marginRight: boolean | number | string,
	padding: boolean | number | string | object,
	paddingHorizontal: boolean | number | string,
	paddingVertical: boolean | number | string,
	paddingTop: boolean | number | string,
	paddingBottom: boolean | number | string,
	paddingLeft: boolean | number | string,
	paddingRight: boolean | number | string,
}>

const Typography = (props: TypographyProps) => {
	const {
		// fonts & sizes
		h1,
		h2,
		h3,
		title,
		subtitle,
		caption,
		small,
		size,
		// styling
		transform,
		regular,
		bold,
		semibold,
		medium,
		weight,
		light,
		center,
		right,
		spacing, // letter-spacing
		height, // line-height
		// colors
		color,
		primary,
		secondary,
		tertiary,
		black,
		white,
		gray,
		error,
		warning,
		success,
		info,
		animated,
		theme,
		style,
		children,
		// sizing props
		margin,
		marginHorizontal,
		marginVertical,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		padding,
		paddingHorizontal,
		paddingVertical,
		paddingTop,
		paddingBottom,
		paddingLeft,
		paddingRight,
		...rest
	} = props;

	const { SIZES, COLORS, FONTS, WEIGHTS } = mergeTheme({ ...expoTheme }, theme);

	const marginSpacing = getMargins({
		margin,
		marginHorizontal,
		marginVertical,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		defaultValue: SIZES.base
	});
	const paddingSpacing = getPaddings({
		padding,
		paddingHorizontal,
		paddingVertical,
		paddingTop,
		paddingBottom,
		paddingLeft,
		paddingRight,
		defaultValue: SIZES.base
	});

	const textStyles = StyleSheet.flatten([
		{
			fontWeight: WEIGHTS.regular,
			fontSize: SIZES.font,
			color: COLORS.font
		},
		h1 && FONTS.h1,
		h2 && FONTS.h2,
		h3 && FONTS.h3,
		title && FONTS.title,
		subtitle && FONTS.subtitle,
		caption && FONTS.caption,
		small && FONTS.small,
		size && { fontSize: String(size) },
		marginSpacing,
		paddingSpacing,
		transform && { textTransform: transform },
		height && { lineHeight: height },
		spacing && { letterSpacing: spacing },
		weight && { fontWeight: String(weight) },
		regular && { fontWeight: WEIGHTS.regular },
		bold && { fontWeight: WEIGHTS.bold },
		semibold && { fontWeight: WEIGHTS.semibold },
		medium && { fontWeight: WEIGHTS.medium },
		light && { fontWeight: WEIGHTS.light },
		center && styles.center,
		right && styles.right,
		// color shortcuts
		primary && { color: COLORS.primary },
		secondary && { color: COLORS.secondary },
		tertiary && { color: COLORS.tertiary },
		black && { color: COLORS.black },
		white && { color: COLORS.white },
		gray && { color: COLORS.gray },
		error && { color: COLORS.error },
		warning && { color: COLORS.warning },
		success && { color: COLORS.success },
		info && { color: COLORS.info },
		color && { color },
		style // rewrite predefined styles
	]);

	if (animated) {
		return (
			<Animated.Text {...rest} style={textStyles}>
				{children}
			</Animated.Text>
		);
	}

	return (
		<Text {...rest} style={textStyles}>
			{children}
		</Text>
	);
};

Typography.defaultProps = {
	// fonts & sizes
	h1: false,
	h2: false,
	h3: false,
	title: false,
	subtitle: false,
	caption: false,
	small: false,
	size: null,
	margin: null,
	padding: null,
	// styling
	transform: null,
	regular: false,
	bold: false,
	semibold: false,
	medium: false,
	weight: false,
	light: false,
	center: false,
	right: false,
	spacing: null, // letter-spacing
	height: null, // line-height
	// colors
	color: null,
	primary: false,
	secondary: false,
	tertiary: false,
	black: false,
	white: false,
	gray: false,
	error: false,
	warning: false,
	success: false,
	info: false,
	theme: {},
	style: {}
};

export default Typography;

const styles = StyleSheet.create({
	center: { textAlign: "center" },
	right: { textAlign: "right" }
});
