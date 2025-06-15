import Container from '@/components/shared/Container';
import ChangePasswordForm from './_components/ChangePasswordForm';
import DeleteAccountSection from './_components/DeleteAccountSection';


const SettingPage = () => {
    return (
        <Container className='md:space-y-8 space-y-5'>
            <ChangePasswordForm/>
            <DeleteAccountSection/>
        </Container>
    );
};

export default SettingPage;