export default function Button({ type = 'button', ...props }) {
  return <button type={type} {...props} />;
}
