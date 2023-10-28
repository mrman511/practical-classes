// import Canvas from "@/components/Canvas";
// import ParticleRipple from "@/components/ParticleRipple";
// import VoidParticles from "@/components/VoidParticles";
import ClickDot from "@/components/ClickDot";

export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="relative w-full h-full">
        < ClickDot
          colSpacing={ 50 }
          rowSpacing={ null }
          particleColor={ [249, 220, 34, .5] }
          particleColorFade={ null }
          rippleSpeed={ 100 }
          particleSpeed={ 15 }
          particleSpeedFunction={ null }
          particleRadiusMax={ 8 }
          particleRadiusFunction={ null }
          maxRadius={ 200 }
          maxRadiusFunction={ null }
          includeStatic={ true }
          staticParticleMaxRadius={ 2 }
          staticParticleColor={ [249, 220, 34, .3] }
        />
      </div>
    </main>
  )
}
