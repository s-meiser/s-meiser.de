<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class Index extends AbstractController
{
    #[Route('/')]
    public function landingpage(): Response
    {
        //return $this->render('threeDimensional.html.twig');
        return $this->render('landingpage.html.twig');
    }

    #[Route('/3d')]
    public function threeDimensional(): Response
    {
        return $this->render('threeDimensional.html.twig');
    }

    #[Route('/flat')]
    public function flat(): Response
    {
        return $this->render('flat.html.twig');
    }
}