import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const INPUT_DIR = 'public/images';
const OUTPUT_DIR = 'public/images/optimized';
const MAX_WIDTH = 1000; // Maximum width for any image

async function main() {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    // Get all files from input directory
    const files = await fs.readdir(INPUT_DIR);
    
    // Filter for image files (excluding directories and already optimized images)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.webp'].includes(ext) && 
             !file.includes('optimized') &&
             !path.basename(file).startsWith('.');
    });
    
    console.log(`Found ${imageFiles.length} images to optimize`);
    
    // Process each image
    for (const file of imageFiles) {
      try {
        const inputPath = path.join(INPUT_DIR, file);
        const fileNameWithoutExt = path.basename(file, path.extname(file));
        
        // Get original file stats
        const originalStats = await fs.stat(inputPath);
        const originalSizeKB = (originalStats.size / 1024).toFixed(2);
        
        console.log(`Processing ${file}:`);
        console.log(`  Original: ${originalSizeKB}KB`);
        
        // Get image metadata
        let metadata;
        try {
          metadata = await sharp(inputPath).metadata();
        } catch (metadataError) {
          console.error(`  Error reading metadata for ${file}:`, metadataError.message);
          console.log('  Skipping this file...');
          console.log('---');
          continue;
        }
        
        // Determine if resize is needed
        const needsResize = metadata.width > MAX_WIDTH;
        const resizeOptions = needsResize ? { width: MAX_WIDTH } : undefined;
        
        // Create optimized PNG/JPG (maintaining original format)
        try {
          const optimizedPath = path.join(OUTPUT_DIR, file);
          await sharp(inputPath)
            .resize(resizeOptions)
            .toFormat(metadata.format, { quality: 80 })
            .toFile(optimizedPath);
          
          // Get optimized file stats
          const optimizedStats = await fs.stat(optimizedPath);
          const optimizedSizeKB = (optimizedStats.size / 1024).toFixed(2);
          const pngReduction = (100 - (optimizedStats.size / originalStats.size * 100)).toFixed(1);
          
          console.log(`  Optimized ${metadata.format}: ${optimizedSizeKB}KB (${pngReduction}% reduction)`);
        } catch (optimizeError) {
          console.error(`  Error creating optimized version of ${file}:`, optimizeError.message);
        }
        
        // Create WebP version
        try {
          const webpPath = path.join(OUTPUT_DIR, `${fileNameWithoutExt}.webp`);
          await sharp(inputPath)
            .resize(resizeOptions)
            .webp({ quality: 80 })
            .toFile(webpPath);
          
          // Get WebP stats
          const webpStats = await fs.stat(webpPath);
          const webpSizeKB = (webpStats.size / 1024).toFixed(2);
          const webpReduction = (100 - (webpStats.size / originalStats.size * 100)).toFixed(1);
          
          console.log(`  WebP: ${webpSizeKB}KB (${webpReduction}% reduction)`);
        } catch (webpError) {
          console.error(`  Error creating WebP version of ${file}:`, webpError.message);
        }
        
        if (needsResize) {
          console.log(`  Resized from ${metadata.width}x${metadata.height} to ${MAX_WIDTH}px width`);
        }
        console.log('---');
      } catch (fileError) {
        console.error(`Error processing ${file}:`, fileError.message);
        console.log('---');
      }
    }
    
    console.log('Image optimization complete!');
    console.log(`Optimized images saved to: ${OUTPUT_DIR}`);
    console.log('Remember to update your image references in the code to use the optimized versions.');
    
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

main(); 