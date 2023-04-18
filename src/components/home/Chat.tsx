import Message from 'components/Message'

export default function Chat () {
  return (
    <div className="flex flex-col gap-8">
      <Message
        from="me"
        content="Hola klsdjf sdlkfjsd klfjsd klfjsdklf jskldfj sdklfj skldfj klsdf jlskdf jklsdf jklsdfj kljkjkljklsdfkljsdf klsjdfkl sdjflksdfjskldfjsdklfjklsdj"
      />
      <Message
        from="gpt"
        content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur voluptate facere eveniet error in, explicabo, vitae eius omnis quaerat quis veniam. Mollitia amet, odio id ipsum libero voluptatibus labore quaerat!"
      />
    </div>
  )
}