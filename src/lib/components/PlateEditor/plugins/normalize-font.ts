import { createSlatePlugin } from '@platejs/core'

import { FONT_FAMILY_OPTIONS } from '../config';

export const StripFontFamilyPlugin = createSlatePlugin({
  key: 'stripFontFamily',
  extendEditor: ({ editor }) => {
    const { normalizeNode } = editor

    editor.normalizeNode = ([node, path]) => {
      const fontFamily = node?.fontFamily?.split(',')?.[0]?.replaceAll('"', '');
      const isSupportedFontFamily = FONT_FAMILY_OPTIONS.some(option => option.value?.toLowerCase() === fontFamily?.toLowerCase());

      (editor as any).setNodes(
        { fontFamily: isSupportedFontFamily ? fontFamily : undefined } as any,
        { at: path, match: (n) => n === node }
      );

      return (normalizeNode as any)([node, path]);
    };

    return editor;
  },
});
