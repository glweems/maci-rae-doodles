import { Image } from 'remix-image';
export default function IndexPage() {
  return (
    <div>
      <Image
        src="/elbow.jpeg"
        responsive={[
          {
            size: {
              width: 100,
              height: 100,
            },
          },
          {
            size: {
              width: 400,
              height: 400,
            },
          },
        ]}
      />
    </div>
  );
}
