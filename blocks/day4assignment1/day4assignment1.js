export default function decorate(block) {
  // Add custom icon to specific buttons
  block.querySelectorAll('a').forEach(link => {
    const text = link.textContent.trim();
    if (text === 'Button Default' || text === 'Button Primary') {
      link.classList.add('custom-icon');
    }
  });
}
