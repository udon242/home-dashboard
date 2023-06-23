import { css } from '@/styled-system/css';
import { Center } from '@/styled-system/jsx';

const PageTitle: React.FC<{ children: string }> = ({ children }) => {
  return (
    <Center paddingY={4}>
      <h2 className={css({ fontSize: 20, fontWeight: 'bold' })}>{children}</h2>
    </Center>
  );
};
export default PageTitle;
