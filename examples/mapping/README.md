# Geoda Quantile Breaks Example

This is a React application demonstrating the usage of the `@geoda/core` library's `quantileBreaks` function. The application provides an interactive interface for calculating and visualizing quantile breaks in spatial data.

## Features

- Interactive quantile breaks calculation
- Custom data input support
- Adjustable number of breaks
- Real-time data summary statistics
- Modern, responsive UI design
- Error handling and loading states
- TypeScript support for type safety

## Prerequisites

- Node.js (v14 or higher)
- Yarn package manager

## Installation

1. Clone the repository
2. Navigate to the example directory:
   ```bash
   cd examples/mapping
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```

## Usage

1. Start the development server:
   ```bash
   yarn start
   ```
2. Open your browser and navigate to `http://localhost:5173`

## How It Works

The application allows you to:

1. Enter custom data as comma-separated numbers
2. Adjust the number of quantile breaks (2-10)
3. View data summary statistics including:
   - Total number of values
   - Minimum value
   - Maximum value
4. See the calculated quantile breaks in a clean, grid-based layout

### Example Data

You can enter your own data in the text area as comma-separated numbers. For example:
```
1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

The application will automatically calculate the quantile breaks for your data.

## Dependencies

- `@geoda/core`: Core library for spatial data analysis
- `react`: UI library
- `react-dom`: React rendering for web
- `typescript`: Type safety and development tools
- `vite`: Build tool and development server

## Development

The project uses:

- TypeScript for type safety
- Vite for fast development and building
- React 18 with hooks
- Modern ES6+ features
- CSS Grid and Flexbox for responsive layouts
- Modern styling with CSS variables and transitions

## Project Structure

```
mapping/
├── src/
│   ├── App.tsx          # Main React component
│   ├── App.css          # Styles for the main component
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tsconfig.node.json   # Node-specific TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## License

This example is part of the geoda-lib project. See the main project's license for details.
