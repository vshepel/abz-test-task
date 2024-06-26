import type { RefObject } from 'react'
import { useRef, useState } from 'react'
import classes from './App.module.scss'
import Container from '@/components/Container/Container.tsx'
import Logo from '@/components/Logo/Logo.tsx'
import Button from '@/components/Button/Button.tsx'
import Title from '@/components/Title/Title.tsx'
import Text from '@/components/Text/Text.tsx'
import UserList from '@/components/UserList/UserList.tsx'
import Form from '@/components/Form/Form.tsx'
import useUsers from '@/hooks/useUsers.ts'

function App() {
  const usersRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    isLoading,
    hasMore,
    users,
    currentPage,
    setCurrentPage,
    reloadList,
  } = useUsers()

  const scrollToRef = (ref: RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  const handleFormSuccess = () => {
    reloadList()
    setIsSubmitted(true)
  }

  return (
    <>
      <header className={classes.header}>
        <Container>
          <div className={classes.header__content}>
            <Logo />
            <div className={classes.header__buttons}>
              <Button onClick={() => scrollToRef(usersRef)}>Users</Button>
              <Button onClick={() => scrollToRef(formRef)}>Sign up</Button>
            </div>
          </div>
        </Container>
      </header>

      <section className={classes.hero}>
        <Container>
          <div className={classes.hero__content}>
            <Title>Test assignment for front-end developer</Title>
            <Text className={classes.hero__text}>
              <p>
                What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast
                understanding of User design thinking as they'll be building web interfaces with accessibility in mind.
                They should also be excited to learn, as the world of Front-End Development keeps evolving.
              </p>
            </Text>
            <Button className={classes.hero__button} onClick={() => scrollToRef(formRef)}>Sign up</Button>
          </div>
        </Container>
      </section>

      <section ref={usersRef} className={classes.users}>
        <Container>
          <Title tag="h2">Working with GET request</Title>
          <UserList
            users={users}
            currentPage={currentPage}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={setCurrentPage}
          />
        </Container>
      </section>

      <section ref={formRef} className={classes.request}>
        <Container>
          <Title tag="h2">{isSubmitted ? 'User successfully registered' : 'Working with POST request'}</Title>
          <div className={classes.request__form}>
            {isSubmitted
              ? (
                <Form.Success />
                )
              : <Form onSuccess={handleFormSuccess} />}
          </div>
        </Container>
      </section>
    </>
  )
}

export default App
