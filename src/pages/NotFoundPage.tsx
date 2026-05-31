import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/I18nContext';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">{t('project_page.not_found_title')}</h1>
        <p className="section-lead">{t('project_page.not_found_body')}</p>
        <Link to="/" className="btn btn-primary">
          {t('project_page.not_found_cta')}
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
