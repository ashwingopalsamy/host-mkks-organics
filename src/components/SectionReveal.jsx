export default function SectionReveal({
  children,
  className = '',
  as = 'div',
}) {
  const Component = as;

  return (
    <Component className={className}>
      {children}
    </Component>
  );
}
