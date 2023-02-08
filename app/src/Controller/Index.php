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
        return $this->render('landingpage.html.twig');
    }

    #[Route('/templates/{slug}', name: 'templates')]
    public function templates(string $slug): Response
    {
        var_dump($slug);
        return $this->render('JSTemplates/test.html.twig');
    }
}