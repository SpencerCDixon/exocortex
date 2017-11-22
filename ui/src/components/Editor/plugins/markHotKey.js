export default function MarkHotKey({ type, key }) {
  return {
    onKeyDown(event, change) {
      if (!event.metaKey || event.key != key) return;

      event.preventDefault();
      change.toggleMark(type);
      return true;
    },
  };
}
