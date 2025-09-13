module.exports = {
  assets: ['./assets/fonts'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.tsx', '.json'], 
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@redux': './src/redux',
          '@config': './src/config',
          '@api': './src/Api',  
        },
      },
    ],
  ],
};