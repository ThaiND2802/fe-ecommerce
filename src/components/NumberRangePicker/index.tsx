import { Flex, InputNumber, InputNumberProps } from 'antd'

import IconSax from 'src/lib/components/IconSax'

interface IProps {
    value?: [number | undefined, number | undefined]
    startProps?: InputNumberProps
    endProps?: InputNumberProps
    onChange?: (value: [number | undefined, number | undefined]) => void
    min?: number
    max?: number
    placeholder?: string
}

const NumberRangePicker = ({ value, onChange, startProps, endProps, min, max, placeholder, ...otherProps }: IProps) => {
    const onFromChange = (num: number | null) => {
        const fromValue = num ?? undefined
        if (fromValue !== undefined && value?.[1] !== undefined && fromValue > value[1]) {
            onChange?.([fromValue, undefined])
        } else {
            onChange?.([fromValue, value?.[1]])
        }
    }

    const onToChange = (num: number | null) => {
        const toValue = num ?? undefined
        if (toValue !== undefined && value?.[0] !== undefined && toValue < value[0]) {
            onChange?.([undefined, toValue])
        } else {
            onChange?.([value?.[0], toValue])
        }
    }

    return (
        <Flex align="center" gap={10}>
            <InputNumber
                min={min}
                max={max}
                value={value?.[0]}
                onChange={onFromChange}
                style={{ width: '100%' }}
                placeholder={placeholder}
                {...otherProps}
                {...startProps}
            />
            <IconSax name="arrow-right" size={22} />
            <InputNumber
                min={min}
                max={max}
                value={value?.[1]}
                onChange={onToChange}
                style={{ width: '100%' }}
                placeholder={placeholder}
                {...otherProps}
                {...endProps}
            />
        </Flex>
    )
}

export default NumberRangePicker
