import { startStimulusApp } from '@symfony/stimulus-bridge';
import ThreeDimensional from './../Controller/ThreeDimensional';

// Registers Stimulus controllers from controllers.json and in the controllers/ directory
export const app = startStimulusApp(require.context(
    '@symfony/stimulus-bridge/lazy-controller-loader!./../Controller',
    true,
    /\.(j|t)sx?$/
));

app.register('threeDimensional', ThreeDimensional);