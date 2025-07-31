# Narrowstack Insights

A modern, interactive dashboard application built with React, TypeScript, and Vite. Features editable table columns, inline text editing, and a comprehensive dashboard system inspired by Metabase.

## 🚀 Features

### 📊 **Editable Table Columns**
- **Column Configuration**: Click the settings icon (⚙️) on any table to configure columns
- **Format Options**: Text, Number, Currency, Percent, Date formatting
- **Visibility Control**: Show/hide columns as needed
- **Alignment**: Left, Center, Right alignment options
- **Editability**: Control which columns can be edited

### ✏️ **Inline Cell Editing**
- **Click to Edit**: Click any editable table cell to modify its value
- **Validation**: Enter to save, Escape to cancel
- **Visual Feedback**: Edit icons appear on hover

### 📝 **Editable Titles & Subtitles**
- **All Card Text**: Every card title and subtitle is now editable
- **Inline Editing**: Click on titles to edit them directly
- **Real-time Updates**: Changes are saved immediately

### 🎨 **Rich Visualizations**
- **Multiple Chart Types**: Bar, Line, Pie, Funnel, Gauge, Number cards
- **Responsive Design**: Charts adapt to different screen sizes
- **Customizable Colors**: Configurable color schemes
- **Interactive Elements**: Hover tooltips and legends

### 🔧 **Dashboard Features**
- **Parameter Filters**: Dynamic filtering with multiple filter types
- **Tabbed Layout**: Organize dashboards with multiple tabs
- **Embedding Support**: Embed dashboards in other applications
- **Export Options**: Download data and charts

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tylercowie/narrowstack-insights.git
   cd narrowstack-insights
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### Editing Table Columns
1. Find a table visualization in the dashboard
2. Click the settings icon (⚙️) in the top-right corner of the table
3. Configure column properties:
   - **Visibility**: Toggle columns on/off
   - **Format**: Choose display format (text, number, currency, etc.)
   - **Alignment**: Set text alignment
   - **Width**: Adjust column width
   - **Editability**: Enable/disable cell editing

### Editing Table Data
1. Click on any editable cell in a table
2. Type your new value
3. Press Enter to save or Escape to cancel

### Editing Card Titles
1. Click on any card title or subtitle
2. Type your new text
3. Press Enter to save or Escape to cancel

## 📁 Project Structure

```
src/
├── components/
│   ├── cards/          # Card components (QuestionCard, TextCard, etc.)
│   ├── embeds/         # Embedding components
│   ├── filters/        # Filter components
│   └── layout/         # Layout components (DashboardGrid, etc.)
├── data/               # Sample data and dashboards
├── lib/                # Utilities and context
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

## 🔧 Configuration

### Dashboard Configuration
Dashboards are configured in `src/data/sampleDashboards.ts`. Each dashboard includes:
- **Cards**: Visualizations and content
- **Parameters**: Filterable parameters
- **Tabs**: Multiple dashboard views
- **Embed Config**: Embedding settings

### Card Types
- **QuestionCard**: Data visualizations (charts, tables)
- **TextCard**: Rich text content
- **LinkCard**: External links
- **ActionCard**: Interactive buttons
- **IframeCard**: Embedded content

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Metabase's dashboard interface
- Built with modern React patterns and TypeScript
- Uses Recharts for beautiful data visualizations

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ by Tyler Cowie** 