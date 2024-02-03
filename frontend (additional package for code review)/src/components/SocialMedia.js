import  LanguageSwitch from './LanguageSwitch'

function SocialMedia() {

  return <>
    <div className="social-media-icons">
      <a className="social-media facebook" href="https://www.facebook.com/profile.php?id=100091964926190" target="_blank"></a>
      <a className="social-media instagram" href="https://instagram.com/level_group.ua?igshid=OGQ5ZDc2ODk2ZA==" target="_blank"></a>
      <a className="social-media tiktok" href="https://tiktok.com" target="_blank"></a>
      <LanguageSwitch />
    </div>
  </>;

}

export default SocialMedia;