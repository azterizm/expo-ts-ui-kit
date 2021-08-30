import React from "react";
import {
	Animated,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
	ViewProps
} from "react-native";

import expoTheme from "./theme";
import { mergeTheme, getMargins, getPaddings } from "./utils";

type BlockProps = ViewProps & {
	flex: boolean,
	noflex: boolean,
	row: boolean,
	column: boolean,
	center: boolean,
	middle: boolean,
	left: boolean,
	right: boolean,
	top: boolean,
	bottom: boolean,
	card: boolean,
	shadow: boolean,
	elevation: number,
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
	width: number | string,
	height: number | string,
	space: number | string,
	radius: number | string,
	wrap: boolean,
	style: any,
	theme: any,
	animated: boolean,
	safe: boolean,
	scroll: boolean,
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
}

const Block = (props: BlockProps) => {
	const {
		flex = true,
		noflex = false,
		row = false,
		column = false,
		center = false,
		middle = false,
		left = false,
		right = false,
		top = false,
		bottom = false,
		card = false,
		shadow = null,
		elevation = 3,
		// colors
		color = null,
		primary = false,
		secondary = false,
		tertiary = false,
		black = false,
		white = false,
		gray = false,
		error = false,
		warning = false,
		success = false,
		info = false,
		// size & positioning
		width = null,
		height = null,
		space = null,
		radius = null,
		wrap = false,
		// custom styling
		style = {},
		theme = {},
		// variations
		animated = false,
		safe = false,
		scroll = false,
		children = null,
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
		// extra props
		...rest
	} = props;
	const { SIZES, COLORS } = mergeTheme(expoTheme, theme);
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

	const blockStyles = StyleSheet.flatten([
		styles.block,
		flex && { flex: flex === true ? 1 : flex },
		(!flex || noflex) && { flex: 0 },
		row && styles.row,
		column && styles.column,
		center && styles.center,
		middle && styles.middle,
		left && styles.left,
		right && styles.right,
		top && styles.top,
		bottom && styles.bottom,
		marginSpacing,
		paddingSpacing,
		wrap && styles.wrap,
		shadow && {
			elevation,
			shadowColor: COLORS.black,
			shadowOffset: { width: 0, height: elevation - 1 },
			shadowOpacity: 0.1,
			shadowRadius: elevation
		},
		space && { justifyContent: `space-${String(space)}` },
		card && { borderRadius: SIZES.radius },
		radius && { borderRadius: String(radius) },
		// color shortcuts
		primary && { backgroundColor: COLORS.primary },
		secondary && { backgroundColor: COLORS.secondary },
		tertiary && { backgroundColor: COLORS.tertiary },
		black && { backgroundColor: COLORS.black },
		white && { backgroundColor: COLORS.white },
		gray && { backgroundColor: COLORS.gray },
		error && { backgroundColor: COLORS.error },
		warning && { backgroundColor: COLORS.warning },
		success && { backgroundColor: COLORS.success },
		info && { backgroundColor: COLORS.info },
		color && { backgroundColor: color }, // custom backgroundColor
		row && { flex: 0 },
		width && { width },
		height && { height },
		style // rewrite predefined styles
	]);

	if (scroll) {
		return (
			<ScrollView {...rest} style={blockStyles}>
				{children}
			</ScrollView>
		);
	}

	if (animated) {
		return (
			<Animated.View {...rest} style={blockStyles}>
				{children}
			</Animated.View>
		);
	}

	if (safe) {
		return (
			<SafeAreaView {...rest} style={blockStyles}>
				{children}
			</SafeAreaView>
		);
	}

	return (
		<View {...rest} style={blockStyles}>
			{children}
		</View>
	);
};

export default Block;

export const styles = StyleSheet.create({
	block: {
		flex: 1
	},
	row: {
		flexDirection: "row"
	},
	column: {
		flexDirection: "column"
	},
	center: {
		alignItems: "center"
	},
	middle: {
		justifyContent: "center"
	},
	left: {
		justifyContent: "flex-start"
	},
	right: {
		justifyContent: "flex-end"
	},
	top: {
		justifyContent: "flex-start"
	},
	bottom: {
		justifyContent: "flex-end"
	},
	wrap: { flexWrap: "wrap" }
});
