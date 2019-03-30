import React from 'react'
import {StyleSheet} from 'react-native'
import {colors} from "./colors";

export const fontFamily = 'Montserrat'
export const FontStyles = StyleSheet.create({
    small: {
        color: colors.black,
        fontSize: 12.00,
        fontFamily,
        fontWeight: '500',
    },
    smallBold: {
        color: colors.black,
        fontSize: 12.00,
        fontFamily,
        fontWeight: '700',
    },
    regular: {
        color: colors.black,
        fontSize: 14.00,
        fontFamily,
        fontWeight: '500',
    },
    bold: {
        color: colors.black,
        fontSize: 16.00,
        fontFamily,
        fontWeight: '700',
    },
    h1: {
        color: colors.black,
        fontSize: 20.00,
        fontFamily,
        fontWeight: '700'
    }
})
