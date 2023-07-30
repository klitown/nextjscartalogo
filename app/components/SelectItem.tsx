'use client';
import React from 'react';
import * as Select from '@radix-ui/react-select';

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

export const SelectItem = ({ value, children }: any) => {
    return (
        <Select.Item value={value}
        >
            <Select.ItemText>
                {children}
            </Select.ItemText>
            <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                <CheckIcon />
            </Select.ItemIndicator>
        </Select.Item>
    );
};
