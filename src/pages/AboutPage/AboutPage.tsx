import { teamMembers } from '../../constants/common';
import styles from './AboutPage.module.scss';
import rsSchoolLogo from '../../assets/rs_school_js.svg';

export function AboutPage(): JSX.Element {
  return (
    <div>
      <h1>О команде разработчиков</h1>
      <div className={styles.page}>
        {teamMembers.map(member => (
          <div className={styles.info} key={member.id}>
            <div className={styles.member}>
              <h2>{member.name}</h2>
              <p>{member.role}</p>
              <img src={member.photo} alt={member.name} />
              <p>{member.bio}</p>
              <a
                href={member.githubProfile}
                target="_blank"
                rel="noopener noreferrer">
                Ссылка на GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
      <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
        <img
          src={rsSchoolLogo}
          alt="RS School Logo"
          className={styles.rsSchoolLogo}
        />
      </a>
    </div>
  );
}
