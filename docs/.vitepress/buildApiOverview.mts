import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // for parsing frontmatter

function processContent(content: string): string {
  // Extract headings and their content
  const lines = content.split('\n');
  let processedContent = '';
  let currentHeading = '';

  for (const line of lines) {
    if (line.startsWith('#')) {
      currentHeading = line;
      processedContent += `\n#${line}\n\n`; // Add a # to the heading to lower the heading level
    } else if (line.trim() && currentHeading) {
      processedContent += `${line}\n`;
    }
  }

  return processedContent;
}

export async function generateApiReferences() {
  const sections = [
    { file: 'mapping.md', title: 'Mapping' },
    { file: 'data-exploration.md', title: 'Data Exploration' },
    { file: 'spatial-weights.md', title: 'Spatial Weights' },
    {
      file: 'spatial-autocorrelation-analysis.md',
      title: 'Spatial Autocorrelation Analysis',
    },
    { file: 'spatial-clustering.md', title: 'Spatial Clustering' },
    { file: 'spatial-regression.md', title: 'Spatial Regression' },
    { file: 'spatial-operations.md', title: 'Spatial Operations' },
  ];

  let content = '---\noutline: deep\n---\n\n# API References\n\n';

  for (const section of sections) {
    const filePath = path.resolve(__dirname, `../reference/${section.file}`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content: sectionContent } = matter(fileContent);

    // Extract headings and links from the content
    // Add them to the main content string
    content += `${processContent(sectionContent)}\n\n`;
  }

  // Write the generated content to api-examples.md
  fs.writeFileSync(path.resolve(__dirname, '../api-overview.md'), content);
}
