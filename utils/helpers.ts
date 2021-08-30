export const getSpacings = (value: any, defaultValue = 0) => {
	// if the value is boolean return defaultValue
	if (typeof value === "boolean") return defaultValue;

	// if the value is integer/number
	if (typeof value === "number") return value;

	// if the value is a string: 2x 4x 1.5x
	if (typeof value === "string") {
		// extract decimal or integer value from value
		const valueMatch = value.match(/((?=.*[1-9])\d*(?:\.\d{1,2})|(\d*))x/);

		if (!valueMatch) return defaultValue;
		return parseFloat(valueMatch[0]) * (defaultValue > 0 ? defaultValue : 1);
	}

	// parse array of values [1, 2, 3, 4]
	if (typeof value === "object") {
		const size = Object.keys(value).length;

		// get value based on array index
		// vertical
		const top = 0;
		const bottom = size === 1 || size === 2 ? 0 : 2;

		// horizontal
		const right = size === 1 ? 0 : 1;
		const left = size === 1 ? 0 : size === 2 ? 1 : 3;

		return {
			top: value[top] || defaultValue,
			right: value[right] || defaultValue,
			bottom: value[bottom] || defaultValue,
			left: value[left] || defaultValue
		};
	}
};

export const getMargins = ({
	margin,
	marginTop,
	marginBottom,
	marginRight,
	marginLeft,
	marginVertical,
	marginHorizontal,
	defaultValue
}: any) => {
	const styles: any = {};

	if (margin) {
		const values: any = getSpacings(margin, defaultValue);
		const isArray = typeof margin === "object";

		styles.marginTop = isArray ? values.top : values;
		styles.marginRight = isArray ? values.right : values;
		styles.marginBottom = isArray ? values.bottom : values;
		styles.marginLeft = isArray ? values.left : values;
	}

	if (marginTop && typeof marginTop !== "object") {
		styles.marginTop = getSpacings(marginTop, defaultValue);
	}

	if (marginBottom && typeof marginBottom !== "object") {
		styles.marginBottom = getSpacings(marginBottom, defaultValue);
	}

	if (marginLeft && typeof marginLeft !== "object") {
		styles.marginLeft = getSpacings(marginLeft, defaultValue);
	}

	if (marginRight && typeof marginRight !== "object") {
		styles.marginRight = getSpacings(marginRight, defaultValue);
	}

	if (marginVertical && typeof marginVertical !== "object") {
		styles.marginTop = getSpacings(marginVertical, defaultValue);
		styles.marginBottom = getSpacings(marginVertical, defaultValue);
	}

	if (marginHorizontal && typeof marginHorizontal !== "object") {
		styles.marginRight = getSpacings(marginHorizontal, defaultValue);
		styles.marginLeft = getSpacings(marginHorizontal, defaultValue);
	}

	return styles;
};

export const getPaddings = ({
	padding,
	paddingTop,
	paddingBottom,
	paddingRight,
	paddingLeft,
	paddingVertical,
	paddingHorizontal,
	defaultValue
}: any) => {
	const styles: any = {};

	if (padding) {
		const values: any = getSpacings(padding, defaultValue);
		const isArray = typeof padding === "object";

		styles.paddingTop = isArray ? values.top : values;
		styles.paddingRight = isArray ? values.right : values;
		styles.paddingBottom = isArray ? values.bottom : values;
		styles.paddingLeft = isArray ? values.left : values;
	}

	if (paddingTop && typeof paddingTop !== "object") {
		styles.paddingTop = getSpacings(paddingTop, defaultValue);
	}

	if (paddingBottom && typeof paddingBottom !== "object") {
		styles.paddingBottom = getSpacings(paddingBottom, defaultValue);
	}

	if (paddingLeft && typeof paddingLeft !== "object") {
		styles.paddingLeft = getSpacings(paddingLeft, defaultValue);
	}

	if (paddingRight && typeof paddingRight !== "object") {
		styles.paddingRight = getSpacings(paddingRight, defaultValue);
	}

	if (paddingVertical && typeof paddingVertical !== "object") {
		styles.paddingTop = getSpacings(paddingVertical, defaultValue);
		styles.paddingBottom = getSpacings(paddingVertical, defaultValue);
	}

	if (paddingHorizontal && typeof paddingHorizontal !== "object") {
		styles.paddingRight = getSpacings(paddingHorizontal, defaultValue);
		styles.paddingLeft = getSpacings(paddingHorizontal, defaultValue);
	}

	return styles;
};

export const mergeTheme = (theme: any, extra: any) => {
	const { COLORS, SIZES, FONTS, WEIGHTS, ...REST } = extra;
	return {
		COLORS: { ...theme?.COLORS, ...COLORS },
		SIZES: { ...theme?.SIZES, ...SIZES },
		FONTS: { ...theme?.FONTS, ...FONTS },
		WEIGHTS: { ...theme?.WEIGHTS, ...WEIGHTS },
		...REST
	};
};
