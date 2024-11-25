function WhoisInfoItem({
  label,
  value,
}: {
  label: string;
  value: string | string[] | undefined;
}) {
  return (
    <p>
      <span className='text-sm'>{label}:</span>{' '}
      {value === undefined ? (
        'N/A'
      ) : Array.isArray(value) ? (
        <ul className='list-disc list-inside'>
          {value.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      ) : (
        value
      )}
    </p>
  );
}

export default WhoisInfoItem