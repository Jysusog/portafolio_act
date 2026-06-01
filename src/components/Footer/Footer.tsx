import './Footer.css';
import { useTranslation } from '../../contexts/I18nContext';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <p className="footer-line">
          © {year} Jesús Martínez · <span className="mono">{t('footer.role')}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
