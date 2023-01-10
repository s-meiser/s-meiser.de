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
        $number = random_int(0, 100);

        return $this->render('landingpage.html.twig');
    }
}