import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Optimize images for responsive loading
  block.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }, { width: '400' }, { width: '200' }]));
  });
}
