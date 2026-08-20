/* ============================================================================
   ALL COURSE CONTENT LIVES HERE. Nothing else needs editing to add material.

   To attach a video: put the YouTube ID in the "yt" field.
   A URL like https://www.youtube.com/watch?v=dQw4w9WgXcQ has the ID dQw4w9WgXcQ.
   Leave "yt" as "" and the slot shows as an empty placeholder.

   Levels for exercises: "easy" | "medium" | "hard"
   ========================================================================== */

const TOPICS = [

/* =========================== 1 ============================ */
{
  slug:"rest-and-motion", num:1, sim:"rest",
  title:"Rest and motion",
  tagline:"Nothing is moving until you say what it is moving against.",
  summary:"Rest and motion are not properties an object owns. They are statements about an object and an observer taken together. Fix the observer first, and only then does it mean anything to call something still.",
  keyIdeas:[
    "A body is at rest with respect to an observer if its position relative to that observer does not change with time.",
    "The same body can be at rest for one observer and in motion for another, at the same instant. Neither observer is mistaken.",
    "A frame of reference is an origin, a set of axes, and a clock, all carried by one observer.",
    "Treat a body as a point object when the distance it moves is far larger than its own size.",
    "Velocities add: v(P/ground) = v(P/train) + v(train/ground)."
  ],
  formulas:[
    {f:"v<sub>P/G</sub> = v<sub>P/T</sub> + v<sub>T/G</sub>", n:"Velocity of P for the ground observer, built from its velocity in the train plus the train's own."},
    {f:"1 km/h = 5/18 m/s ≈ 0.278 m/s", n:"The conversion you will use in almost every numerical problem."}
  ],
  videos:[
    {t:"What 'at rest' actually means", covers:"Why the sentence 'the box is at rest' is incomplete until you name the observer.", mins:"6-8", yt:""},
    {t:"Building a frame of reference", covers:"Origin, axes and clock. Setting up a frame for a problem before writing any equation.", mins:"7-9", yt:""},
    {t:"When a train is a dot", covers:"The point-object approximation, with the size-to-journey ratio test.", mins:"5-7", yt:""},
    {t:"Reading a position-time table", covers:"Spotting rest, uniform motion and reversal straight from a table of x against t.", mins:"6-8", yt:""},
    {t:"Traps in relative language", covers:"The mistakes examiners look for: unstated frames, mixed units, sign errors on a line.", mins:"8-10", yt:""}
  ],
  examples:[
    {
      q:"A train runs east at 72 km/h. A passenger walks towards the engine at 1.5 m/s as measured inside the train. A second passenger sits still in a seat. Find the velocity of each passenger with respect to the ground, and the velocity of the walker with respect to the seated passenger.",
      sol:[
        "Convert first: 72 km/h × 5/18 = 20 m/s. Take east as positive.",
        "Seated passenger: velocity relative to the train is 0, so v = 0 + 20 = 20 m/s east.",
        "Walking passenger: velocity relative to the train is +1.5 m/s, so v = 1.5 + 20 = 21.5 m/s east.",
        "Relative to the seated passenger: 21.5 − 20 = 1.5 m/s east, which is exactly the walking speed measured inside the train. The train's own motion cancels."
      ],
      ans:"Seated 20 m/s east, walker 21.5 m/s east, walker relative to seated 1.5 m/s east.",
      yt:""
    },
    {
      q:"A train 200 m long makes a journey of 400 km. In a second problem the same train crosses a bridge 300 m long. In which of the two can the train be treated as a point object?",
      sol:[
        "The test is the ratio of the body's own size to the length scale of the problem.",
        "Journey: 200 m / 400000 m = 0.0005, that is 0.05 per cent. The train's length changes the answer by nothing measurable, so treat it as a point.",
        "Bridge: 200 m / 300 m = 0.67. The train's length is two thirds of the bridge, and the train is only clear once its rear leaves the far end. The length matters, so it is not a point object here.",
        "The object did not change. The question did."
      ],
      ans:"Point object for the 400 km journey, definitely not for the 300 m bridge.",
      yt:""
    }
  ],
  exercises:[
    {lv:"easy", q:"Convert 54 km/h into m/s.", sol:["Multiply by 5/18.","54 × 5/18 = 15."], ans:"15 m/s"},
    {lv:"easy", q:"You are sitting inside a moving bus. Name one object at rest relative to you and one in motion relative to you, and say what each does relative to the road.", sol:["At rest relative to you: your bag on the next seat. Relative to the road it moves at the bus speed.","In motion relative to you: a lamp post outside. Relative to the road it is at rest."], ans:"Bag (rest for you, moving for the road), lamp post (moving for you, rest for the road)."},
    {lv:"easy", q:"The Earth has a diameter of about 12 700 km and orbits the Sun at a radius of about 1.5 × 10⁸ km. Can the Earth be treated as a point object for its orbit?", sol:["Ratio = 1.27 × 10⁴ / 1.5 × 10⁸ ≈ 8.5 × 10⁻⁵.","That is under a hundredth of a per cent, so yes."], ans:"Yes, the ratio is about 8 × 10⁻⁵."},
    {lv:"easy", q:"A particle sits at x = 4 m at every instant from t = 0 to t = 10 s in the ground frame. Is it at rest? What is its displacement over that interval?", sol:["Position does not change with time in that frame, so it is at rest in the ground frame.","Displacement = 4 − 4 = 0."], ans:"At rest in the ground frame, displacement 0."},

    {lv:"medium", q:"Two cars travel east on a straight road, one at 20 m/s and the other at 25 m/s. Find the velocity of the faster car relative to the slower one, and of the slower relative to the faster.", sol:["Take east positive. v(2/1) = 25 − 20 = +5 m/s.","v(1/2) = 20 − 25 = −5 m/s, that is 5 m/s west."], ans:"+5 m/s east, and 5 m/s west respectively."},
    {lv:"medium", q:"A lift rises at a steady 2 m/s. A person inside releases a coin. What is the coin's velocity relative to the person at the instant of release, and relative to the ground?", sol:["Before release the coin travels with the person, so their relative velocity is zero.","Relative to the ground both move up at 2 m/s, so the coin starts with 2 m/s upward."], ans:"0 relative to the person, 2 m/s upward relative to the ground."},
    {lv:"medium", q:"Rain falls vertically at 4 m/s. A man walks horizontally at 3 m/s. Find the speed and direction of the rain as he experiences it.", sol:["v(rain/man) = v(rain) − v(man). Horizontally that is 0 − 3 = −3 m/s, so 3 m/s opposite to his walk.","Vertically it stays 4 m/s downward.","Speed = √(3² + 4²) = 5 m/s.","Angle from the vertical: tanθ = 3/4, θ = 36.9°, tilted towards his front so he must tip the umbrella forward."], ans:"5 m/s, at 36.9° from the vertical, slanting towards his direction of walking."},
    {lv:"medium", q:"A 150 m train crosses a 350 m bridge. Explain with a ratio whether the point-object approximation is safe, and state what physical quantity it would spoil.", sol:["Ratio = 150/350 = 0.43, so the train's length is 43 per cent of the bridge.","Treating it as a point would give the crossing distance as 350 m instead of 500 m, an error of 30 per cent in the time taken."], ans:"Not safe. The real crossing distance is 150 + 350 = 500 m."},

    {lv:"hard", q:"A boy stands on a flatcar rolling at a constant 10 m/s and throws a ball straight up at 15 m/s relative to himself. Describe the ball's path in his frame and in the ground frame, and find where it lands. Take g = 9.8 m/s².", sol:["In his frame the flatcar is at rest and the throw is purely vertical, so the ball rises, falls and lands back in his hand.","Time of flight: t = 2u/g = 2 × 15 / 9.8 = 3.06 s.","In the ground frame the ball also carries the flatcar's 10 m/s horizontally, which nothing changes during the flight.","Horizontal distance in the ground frame = 10 × 3.06 = 30.6 m, and the path is a parabola.","The flatcar covers the same 30.6 m in that time, which is why the ball still lands in his hand."], ans:"Straight up and down for the boy, a parabola of horizontal span 30.6 m for the ground. It lands back in his hand either way."},
    {lv:"hard", q:"A car moves at 20 m/s on a straight road through vertically falling rain. On the side window the rain streaks make an angle of 30° with the vertical. Find the speed of the rain relative to the ground.", sol:["In the car's frame the rain has a horizontal component of 20 m/s backwards and a vertical component equal to its true fall speed v.","The streak angle from the vertical satisfies tan 30° = 20 / v.","v = 20 / tan 30° = 20 × √3 = 34.6 m/s."], ans:"About 34.6 m/s vertically downward."}
  ],
  puzzle:{
    t:"Stand still while the train moves",
    setup:"Open the Rest and motion simulation. It has two sliders: the train's velocity with respect to the ground, and the passenger's velocity with respect to the train.",
    task:"Set the train to any non-zero velocity you like, then find the passenger setting that makes the passenger genuinely at rest for the platform observer while the carriage around them is clearly moving. Then switch the observer to the train and describe what the same passenger is now doing.",
    hint:"You need v(P/train) + v(train/ground) = 0.",
    ans:"Set the passenger velocity to the negative of the train velocity, for example train +4 m/s and passenger −4 m/s. The platform sees a motionless person inside a moving carriage. Switch to the train frame and that same person is walking backwards at 4 m/s. This is exactly what happens when you walk down the aisle of a train at the train's own speed, which is also why a person running the wrong way on an airport travelator can hang motionless above the same floor tile."
  },
  funny:[
    {t:"World's laziest athlete", d:"While you nap you are moving at roughly 465 m/s from Earth's spin at the equator, about 30 km/s around the Sun, and about 220 km/s around the galaxy. Have students calculate how far they travelled during a nap, then argue that lying down is a competitive sport."},
    {t:"Who pushed whom", d:"Two students share a chair on a rolling office chair. One accuses the other of pushing. Replay it with the room as the frame and with the chair as the frame, and let the class discover that both accounts are consistent."},
    {t:"The frame-of-reference excuse generator", d:"Every homework excuse must be defended by naming a frame. 'I did not move' is acceptable if the student names the frame in which it is true. Awards for the most technically correct and least useful answer."}
  ]
},

/* =========================== 2 ============================ */
{
  slug:"distance-and-displacement", num:2, sim:"distance",
  title:"Distance and displacement",
  tagline:"How far you walked, versus how far you got.",
  summary:"Distance is the length of the path actually traced. Displacement is the straight arrow from where you started to where you stopped, and it carries a direction. They agree only when the motion never reverses.",
  keyIdeas:[
    "Distance is a scalar and is never negative. It only ever adds up.",
    "Displacement is a vector. On a straight line its sign tells you the direction.",
    "Distance ≥ |displacement| for every possible path, with equality only for motion in a fixed direction.",
    "Displacement depends only on the endpoints, so any two paths with the same start and finish share it.",
    "A closed loop has zero displacement no matter how long the path was."
  ],
  formulas:[
    {f:"Δx⃗ = r⃗<sub>final</sub> − r⃗<sub>initial</sub>", n:"Displacement is a difference of position vectors, nothing more."},
    {f:"s ≥ |Δx⃗|", n:"Path length is at least the straight-line gap. The shortest path between two points is the straight one."},
    {f:"|Δr⃗| = √(Δx² + Δy²)", n:"Magnitude of a displacement in a plane, from its components."}
  ],
  videos:[
    {t:"Path length against straight arrow", covers:"The two quantities defined side by side on one diagram.", mins:"6-8", yt:""},
    {t:"Displacement is a vector", covers:"Magnitude and direction, and how to state a displacement in full.", mins:"7-9", yt:""},
    {t:"Why distance can never be smaller", covers:"The triangle-inequality argument, done without heavy algebra.", mins:"5-7", yt:""},
    {t:"Signs on a straight line", covers:"Choosing a positive direction and staying consistent through a multi-leg problem.", mins:"6-8", yt:""},
    {t:"Adding displacements tip to tail", covers:"Combining several legs into one resultant, with a worked plane example.", mins:"8-10", yt:""}
  ],
  examples:[
    {
      q:"A man walks 4 m due east, then turns and walks 3 m due north. Find the distance covered and the displacement.",
      sol:[
        "Distance is the sum of the legs: 4 + 3 = 7 m.",
        "For displacement, take east as the x axis and north as the y axis. The legs are perpendicular, so Δx = 4 m and Δy = 3 m.",
        "Magnitude = √(4² + 3²) = √25 = 5 m.",
        "Direction: tanθ = 3/4, so θ = 36.9° north of east."
      ],
      ans:"Distance 7 m, displacement 5 m at 36.9° north of east.",
      yt:""
    },
    {
      q:"A particle moves along a circle of radius 7 m. Find the distance and the displacement when it has covered (a) half the circle, (b) the full circle.",
      sol:[
        "(a) Half the circle: the arc length is πR = π × 7 = 21.99 m.",
        "The endpoints are diametrically opposite, so the displacement is the diameter, 2R = 14 m, directed from the start point through the centre.",
        "(b) Full circle: the arc length is 2πR = 43.98 m.",
        "The particle finishes where it began, so the displacement is exactly zero."
      ],
      ans:"(a) 21.99 m and 14 m, (b) 43.98 m and 0.",
      yt:""
    }
  ],
  exercises:[
    {lv:"easy", q:"A boy walks 10 m east and then 4 m west. Find the distance and the displacement.", sol:["Distance = 10 + 4 = 14 m.","Take east positive: displacement = +10 − 4 = +6 m."], ans:"14 m and 6 m east."},
    {lv:"easy", q:"You walk 2 km from home to school and 2 km back. Find distance and displacement for the whole trip.", sol:["Distance = 2 + 2 = 4 km.","Start and finish are the same point, so displacement = 0."], ans:"4 km and 0."},
    {lv:"easy", q:"A particle moves in a straight line from x = −3 m to x = +5 m. Find its displacement.", sol:["Δx = x_final − x_initial = 5 − (−3) = 8."], ans:"+8 m, in the direction of increasing x."},
    {lv:"easy", q:"Can the distance ever be less than the magnitude of the displacement? Justify in one line.", sol:["The displacement is the straight line between the endpoints and the straight line is the shortest route between two points."], ans:"No. Distance ≥ |displacement| always."},

    {lv:"medium", q:"A person walks 3 m north, then 4 m east, then 3 m south. Find the distance and the displacement.", sol:["Distance = 3 + 4 + 3 = 10 m.","North and south cancel: net north displacement = 3 − 3 = 0.","Net east displacement = 4 m."], ans:"10 m and 4 m due east."},
    {lv:"medium", q:"A particle travels one quarter of a circle of radius 5 m. Find the distance and the displacement.", sol:["Arc = (1/4)(2πR) = πR/2 = π × 5/2 = 7.85 m.","The endpoints are separated by the chord of a right angle at the centre, which is R√2 = 5 × 1.414 = 7.07 m."], ans:"7.85 m and 7.07 m."},
    {lv:"medium", q:"Is it possible for a body to cover a distance of 13 m with a displacement of 5 m? If yes, construct one such path on a straight line.", sol:["Possible because 13 ≥ 5.","Walk 9 m forward then 4 m back: distance = 9 + 4 = 13 m, displacement = 9 − 4 = 5 m."], ans:"Yes. For example 9 m forward followed by 4 m back."},
    {lv:"medium", q:"A particle moves along the x axis with x = t² − 4t metres, t in seconds. Find its distance and displacement between t = 0 and t = 3 s.", sol:["x(0) = 0, x(3) = 9 − 12 = −3 m, so the displacement is −3 m.","Velocity v = dx/dt = 2t − 4, which is zero at t = 2 s. The particle turns there.","x(2) = 4 − 8 = −4 m.","Distance = |−4 − 0| + |−3 − (−4)| = 4 + 1 = 5 m."], ans:"Displacement −3 m, distance 5 m."},

    {lv:"hard", q:"A man walks 5 m due east, then 5 m towards the north-east, then 5 m due north. Find the magnitude and direction of his displacement.", sol:["Resolve every leg. East components: 5 + 5 cos 45° + 0 = 5 + 3.536 = 8.536 m.","North components: 0 + 5 sin 45° + 5 = 3.536 + 5 = 8.536 m.","Magnitude = √(8.536² + 8.536²) = 8.536 × √2 = 12.07 m.","The two components are equal, so the direction is 45° north of east."], ans:"12.07 m towards the north-east."},
    {lv:"hard", q:"An ant crawls along the surface of a cube of edge 10 cm, from one corner to the corner diagonally opposite, by the shortest surface route. Find the distance it crawls and its displacement.", sol:["Unfold two adjoining faces into one flat 10 cm by 20 cm rectangle. The shortest surface route becomes the straight diagonal of that rectangle.","Distance = √(10² + 20²) = √500 = 22.36 cm.","The displacement is the straight line through the solid, which is the space diagonal, a√3 = 10 × 1.732 = 17.32 cm.","The ant cannot travel that line because it must stay on the surface, which is exactly why the distance is larger."], ans:"Distance 22.36 cm, displacement 17.32 cm."}
  ],
  puzzle:{
    t:"The crow and the car",
    setup:"Pick any two places in your town. Get the driving distance from a maps app, then measure the straight-line separation on the same map.",
    task:"Compute the ratio of driving distance to straight-line separation for five different pairs of places. Which quantity is the distance and which is the displacement? What does a large ratio tell you about the terrain or the road layout, and what would a ratio close to 1 look like on the ground?",
    hint:"The straight-line separation is the magnitude of the displacement, and it can never be the larger of the two.",
    ans:"The road figure is the distance and the straight-line figure is the magnitude of the displacement, so the ratio is never below 1. A ratio near 1 means a straight highway across flat open ground. Ratios of 1.5 and above usually mean a river, a hill, a one-way system or a lake in the way. City centres and mountain roads give the worst ratios, sometimes above 3."
  },
  funny:[
    {t:"The treadmill paradox", d:"Run 5 km on a treadmill. Distance 5000 m, displacement 0. Ask the class to write a one-line complaint letter to the gym demanding a refund on the grounds that no displacement was delivered."},
    {t:"Pigeon versus delivery app", d:"Race a paper plane thrown straight at a target against a student who must follow the corridor layout. Same endpoints, wildly different path lengths. Plot both on the floor plan."},
    {t:"Displacement-only sports day", d:"Score a race purely on displacement, not distance. Standing at the finish line the whole time wins. Let students find the loophole themselves, then use it to define why we normally care about distance."}
  ]
},

/* =========================== 3 ============================ */
{
  slug:"speed", num:3, sim:"speed",
  title:"Average and instantaneous speed",
  tagline:"Total distance over total time, and never the average of the speeds.",
  summary:"Average speed is one division: everything you travelled, divided by every second it took, rests and detours included. Instantaneous speed is what the speedometer shows at one moment. Mixing the two up is the single most common error in this chapter.",
  keyIdeas:[
    "Average speed = total distance ÷ total time. Time spent at rest still counts in the denominator.",
    "Averaging the individual speeds is wrong unless the times spent at each speed are equal.",
    "Equal distances at two speeds give the harmonic mean 2v₁v₂/(v₁+v₂), which is always below the plain average.",
    "Instantaneous speed is the limit of average speed as the interval shrinks to zero.",
    "On a distance-time graph, the slope of the chord is the average speed and the slope of the tangent is the instantaneous speed."
  ],
  formulas:[
    {f:"v<sub>avg</sub> = total distance ⁄ total time", n:"The definition. Resist the urge to average the speeds instead."},
    {f:"v<sub>avg</sub> = 2v₁v₂ ⁄ (v₁ + v₂)", n:"Equal distances covered at two different speeds."},
    {f:"v<sub>avg</sub> = (v₁ + v₂) ⁄ 2", n:"Equal times spent at two different speeds. Only this case gives the plain average."},
    {f:"v = ds/dt", n:"Instantaneous speed as the derivative of path length with respect to time."}
  ],
  videos:[
    {t:"The one division that defines average speed", covers:"Total distance over total time, and the rests that students forget to count.", mins:"6-8", yt:""},
    {t:"Why 40 and 60 do not average to 50", covers:"Equal distances against equal times, worked side by side on the same trip.", mins:"8-10", yt:""},
    {t:"Deriving the harmonic mean", covers:"Where 2v₁v₂/(v₁+v₂) comes from, in four lines.", mins:"5-7", yt:""},
    {t:"Slopes on a distance-time graph", covers:"Chord and tangent, and reading both off the same curve.", mins:"7-9", yt:""},
    {t:"Uniform and non-uniform speed", covers:"What a straight-line graph guarantees and what a curve does not.", mins:"5-7", yt:""}
  ],
  examples:[
    {
      q:"A car covers the first half of a journey at 40 km/h and the second half at 60 km/h. Find the average speed for the whole journey.",
      sol:[
        "Let the total distance be 2d, so each half is d.",
        "Time for the first half: t₁ = d/40. Time for the second half: t₂ = d/60.",
        "Total time = d/40 + d/60 = d(3 + 2)/120 = 5d/120 = d/24.",
        "Average speed = total distance ÷ total time = 2d ÷ (d/24) = 48 km/h.",
        "Note that 48 is below 50, because the slower half takes longer and therefore carries more weight."
      ],
      ans:"48 km/h.",
      yt:""
    },
    {
      q:"A cyclist rides 5 km at 15 km/h, rests for 20 minutes, then rides a further 3 km at 12 km/h. Find the average speed for the whole outing.",
      sol:[
        "First leg: t₁ = 5/15 = 1/3 h = 20 min.",
        "Rest: t₂ = 20 min.",
        "Second leg: t₃ = 3/12 = 0.25 h = 15 min.",
        "Total time = 20 + 20 + 15 = 55 min = 55/60 h = 0.9167 h.",
        "Total distance = 5 + 3 = 8 km.",
        "Average speed = 8 ÷ 0.9167 = 8.73 km/h.",
        "The rest adds nothing to the distance but a full 20 minutes to the time, which is why the answer sits below both riding speeds."
      ],
      ans:"About 8.73 km/h.",
      yt:""
    }
  ],
  exercises:[
    {lv:"easy", q:"A sprinter runs 100 m in 12.5 s. Find the average speed.", sol:["v = 100/12.5 = 8."], ans:"8 m/s"},
    {lv:"easy", q:"Express 72 km/h in m/s and 25 m/s in km/h.", sol:["72 × 5/18 = 20 m/s.","25 × 18/5 = 90 km/h."], ans:"20 m/s and 90 km/h."},
    {lv:"easy", q:"A distance-time graph is a straight line through the origin with slope 4 m/s. State the speed and say whether the motion is uniform.", sol:["Slope of a distance-time graph is the speed, so 4 m/s.","The slope is the same everywhere, so the speed never changes."], ans:"4 m/s, uniform."},
    {lv:"easy", q:"A car's speedometer reads 60 km/h. Is that an average speed or an instantaneous speed?", sol:["It reports the speed at the moment you look at it, with no reference to any earlier part of the trip."], ans:"Instantaneous speed."},

    {lv:"medium", q:"A body covers equal distances at 20 m/s and 30 m/s. Find the average speed.", sol:["Equal distances, so use the harmonic mean: 2v₁v₂/(v₁+v₂).","= 2 × 20 × 30 / 50 = 1200/50 = 24."], ans:"24 m/s"},
    {lv:"medium", q:"A body moves for equal times at 20 m/s and 30 m/s. Find the average speed, and say why it differs from the previous answer.", sol:["Let each interval be t. Distance = 20t + 30t = 50t, total time = 2t.","v_avg = 50t/2t = 25 m/s.","With equal times each speed gets the same weight, so the plain average is correct here. With equal distances the slow leg occupies more time and drags the average down."], ans:"25 m/s, and it is higher because equal times weight both speeds equally."},
    {lv:"medium", q:"A car covers 60 km in 1 h and the next 60 km in 1.5 h. Find the average speed for the full 120 km.", sol:["Total distance = 120 km, total time = 2.5 h.","v_avg = 120/2.5 = 48 km/h."], ans:"48 km/h"},
    {lv:"medium", q:"A particle covers the first one third of a distance at 10 m/s and the remaining two thirds at 20 m/s. Find the average speed.", sol:["Let the total distance be D.","t₁ = (D/3)/10 = D/30 and t₂ = (2D/3)/20 = D/30.","Total time = D/30 + D/30 = D/15.","v_avg = D ÷ (D/15) = 15 m/s."], ans:"15 m/s"},

    {lv:"hard", q:"A body covers the first half of a distance at 10 m/s. For the second half it spends the first half of that time at 20 m/s and the remaining time at 30 m/s. Find the average speed for the whole journey.", sol:["Let the total distance be D. First half D/2 at 10 m/s gives t₁ = D/20.","For the second half let the time be t₂, split into two equal parts.","Distance covered = 20(t₂/2) + 30(t₂/2) = 25t₂, and this must equal D/2, so t₂ = D/50.","Total time = D/20 + D/50 = (5D + 2D)/100 = 7D/100.","v_avg = D ÷ (7D/100) = 100/7 = 14.29 m/s."], ans:"100/7 ≈ 14.29 m/s"},
    {lv:"hard", q:"A particle moves along the x axis with x = 3t² − 6t + 4 in SI units. Find its average speed and its average velocity between t = 0 and t = 3 s, and its instantaneous speed at t = 3 s.", sol:["v = dx/dt = 6t − 6, which vanishes at t = 1 s, so the particle turns there.","x(0) = 4 m, x(1) = 3 − 6 + 4 = 1 m, x(3) = 27 − 18 + 4 = 13 m.","Distance = |1 − 4| + |13 − 1| = 3 + 12 = 15 m, so average speed = 15/3 = 5 m/s.","Displacement = 13 − 4 = 9 m, so average velocity = 9/3 = 3 m/s.","Instantaneous speed at t = 3: v = 6(3) − 6 = 12 m/s."], ans:"Average speed 5 m/s, average velocity 3 m/s, instantaneous speed 12 m/s at t = 3 s."}
  ],
  puzzle:{
    t:"Beat the speedometer",
    setup:"Mark a straight 100 m stretch of a road, corridor or field. One student walks or cycles it while a partner times the whole run with a stopwatch and a third records the speed at the exact midpoint using a phone speedometer app or a cycle computer.",
    task:"Compute the average speed from the total time. Compare it with the instantaneous reading at the midpoint. Then repeat with a deliberate 10 second pause in the middle and see which of the two numbers changes.",
    hint:"Ask yourself which of the two quantities has the pause anywhere in its formula.",
    ans:"The average speed drops sharply when you add the pause, because the 10 seconds enter the denominator while the distance stays at 100 m. The midpoint instantaneous reading is unchanged, since it only describes one instant. Students usually predict both will fall, which is the misconception the activity is designed to break."
  },
  funny:[
    {t:"Commute audit", d:"Have each student compute the average speed of their journey to school, counting every red light, every wait and the hunt for a misplaced shoe. Post a leaderboard of the slowest. The winner is usually beaten by a brisk walk."},
    {t:"Escalator standers versus walkers", d:"Time both on the same escalator and compute average speeds. Then compute the average speed of the whole queue, which is the number that actually matters, and start an argument about escalator etiquette backed by real figures."},
    {t:"Snail units", d:"A garden snail moves at roughly 0.013 m/s. Convert everyday speeds into snails and have students report their walking speed as 'about 100 snails'. Absurd, but it makes unit conversion muscle memory."}
  ]
},

/* =========================== 4 ============================ */
{
  slug:"velocity", num:4, sim:"velocity",
  title:"Average and instantaneous velocity",
  tagline:"Direction gets a vote, and that changes the arithmetic.",
  summary:"Average velocity divides displacement by time, so it cares only where you started and where you finished. Run a full lap and it is zero however hard you ran. Instantaneous velocity is the tangent to the position-time graph at one moment.",
  keyIdeas:[
    "Average velocity = displacement ÷ time interval, a vector.",
    "Average speed = distance ÷ time interval, a scalar. The two differ whenever the motion reverses.",
    "|average velocity| ≤ average speed, always, because |displacement| ≤ distance.",
    "Instantaneous velocity is the limit of Δx/Δt as Δt → 0, that is dx/dt.",
    "The magnitude of the instantaneous velocity equals the instantaneous speed. This is only true instant by instant, never for averages."
  ],
  formulas:[
    {f:"v⃗<sub>avg</sub> = Δr⃗ ⁄ Δt", n:"Displacement over time. The path taken in between is irrelevant."},
    {f:"v⃗ = dr⃗/dt", n:"Instantaneous velocity, the tangent to the position-time curve."},
    {f:"|v⃗<sub>avg</sub>| ≤ average speed", n:"Equality only when the direction of motion never changes."}
  ],
  videos:[
    {t:"Velocity as a vector", covers:"Why adding direction changes the definition rather than decorating it.", mins:"6-8", yt:""},
    {t:"Same trip, two averages", covers:"Average speed and average velocity computed for one round trip, side by side.", mins:"7-9", yt:""},
    {t:"The tangent on an x-t graph", covers:"Shrinking a chord into a tangent, and what the slope is telling you.", mins:"8-10", yt:""},
    {t:"Signs, and what negative velocity means", covers:"Reading direction off the sign, on a line and on a graph.", mins:"5-7", yt:""},
    {t:"Velocity from a position function", covers:"Differentiating x(t) and evaluating at an instant, with two worked cases.", mins:"7-9", yt:""}
  ],
  examples:[
    {
      q:"A man travels 10 km due east in 1 hour and returns along the same road in 1.5 hours. Find his average speed and his average velocity for the whole trip.",
      sol:[
        "Total distance = 10 + 10 = 20 km. Total time = 1 + 1.5 = 2.5 h.",
        "Average speed = 20 / 2.5 = 8 km/h.",
        "He finishes where he began, so the displacement is 0.",
        "Average velocity = 0 / 2.5 = 0.",
        "The two numbers describe the same trip honestly. One measures effort, the other measures progress."
      ],
      ans:"Average speed 8 km/h, average velocity zero.",
      yt:""
    },
    {
      q:"A particle moves along the x axis with x = 5t² + 3t, in metres and seconds. Find its average velocity between t = 2 s and t = 4 s, and its instantaneous velocity at t = 4 s.",
      sol:[
        "x(2) = 5(4) + 3(2) = 20 + 6 = 26 m.",
        "x(4) = 5(16) + 3(4) = 80 + 12 = 92 m.",
        "Average velocity = (92 − 26) / (4 − 2) = 66 / 2 = 33 m/s.",
        "Differentiate: v = dx/dt = 10t + 3.",
        "At t = 4 s, v = 40 + 3 = 43 m/s.",
        "The instantaneous value is larger because the particle keeps speeding up through the interval, so the end of the interval is faster than its average."
      ],
      ans:"Average velocity 33 m/s, instantaneous velocity 43 m/s.",
      yt:""
    }
  ],
  exercises:[
    {lv:"easy", q:"A body has a displacement of 60 m along +x in 12 s. Find its average velocity.", sol:["v_avg = 60/12 = 5, along +x."], ans:"+5 m/s"},
    {lv:"easy", q:"An athlete runs one full lap of a 400 m track in 50 s. Find the average speed and the average velocity.", sol:["Average speed = 400/50 = 8 m/s.","One full lap means the displacement is zero, so the average velocity is zero."], ans:"8 m/s and 0."},
    {lv:"easy", q:"An x-t graph is a straight line with slope −3 m/s. State the velocity and describe the motion.", sol:["The slope of an x-t graph is the velocity, so v = −3 m/s.","Negative slope means x decreases steadily, so the body moves in the −x direction at constant speed."], ans:"−3 m/s, uniform motion in the −x direction."},
    {lv:"easy", q:"Can the average velocity be zero while the average speed is not? Give one example.", sol:["Yes, whenever the body returns to its start.","A round trip of 5 km each way: displacement 0 but distance 10 km."], ans:"Yes, any closed trip."},

    {lv:"medium", q:"A particle moves from x = 0 to x = 10 m in 2 s, then back to x = 4 m in the next 3 s. Find its average velocity and average speed for the 5 s.", sol:["Displacement = 4 − 0 = 4 m, total time = 5 s, so v_avg = 4/5 = 0.8 m/s.","Distance = 10 + 6 = 16 m, so average speed = 16/5 = 3.2 m/s."], ans:"Average velocity 0.8 m/s, average speed 3.2 m/s."},
    {lv:"medium", q:"For x = 2 + 3t − t² in SI units, find the average velocity between t = 0 and t = 3 s and the instantaneous velocity at t = 3 s.", sol:["x(0) = 2 m and x(3) = 2 + 9 − 9 = 2 m, so the displacement is zero and the average velocity is 0.","v = dx/dt = 3 − 2t, so at t = 3, v = 3 − 6 = −3 m/s.","Zero average with a non-zero instantaneous value simply means the particle went out and came back."], ans:"Average velocity 0, instantaneous velocity −3 m/s."},
    {lv:"medium", q:"A body moves 3 m due north in 1 s and then 4 m due east in the next 1 s. Find the average velocity and the average speed.", sol:["Displacement components: 3 m north and 4 m east, magnitude √(9+16) = 5 m.","Direction: tanθ = 4/3 measured from north, so θ = 53.1° east of north.","Average velocity = 5/2 = 2.5 m/s in that direction.","Distance = 3 + 4 = 7 m, so average speed = 7/2 = 3.5 m/s."], ans:"2.5 m/s at 53.1° east of north, and 3.5 m/s."},
    {lv:"medium", q:"A car travels from A to B at 60 km/h and returns along the same road at 40 km/h. Find the average speed and the average velocity for the round trip.", sol:["Let AB = d. Time out = d/60, time back = d/40, total = d(2 + 3)/120 = d/24.","Average speed = 2d ÷ (d/24) = 48 km/h.","The car ends at A, so the displacement is zero and the average velocity is zero."], ans:"48 km/h and 0."},

    {lv:"hard", q:"A particle moves with x = t³ − 6t² + 9t in SI units. Find (a) the instants at which it is momentarily at rest, (b) the average velocity from t = 0 to t = 4 s, and (c) the distance covered in that interval.", sol:["v = dx/dt = 3t² − 12t + 9 = 3(t − 1)(t − 3), so v = 0 at t = 1 s and t = 3 s.","x(0) = 0, x(1) = 1 − 6 + 9 = 4 m, x(3) = 27 − 54 + 27 = 0, x(4) = 64 − 96 + 36 = 4 m.","(b) Average velocity = (4 − 0)/4 = 1 m/s.","(c) The particle reverses twice, so add the legs: |4 − 0| + |0 − 4| + |4 − 0| = 4 + 4 + 4 = 12 m.","Average speed is therefore 12/4 = 3 m/s, three times the average velocity."], ans:"(a) t = 1 s and 3 s, (b) 1 m/s, (c) 12 m."},
    {lv:"hard", q:"A particle moves in a plane with r⃗ = 3t î + (4t − 5t²) ĵ in SI units. Find its velocity at t = 0 and its average velocity between t = 0 and t = 0.8 s.", sol:["v⃗ = dr⃗/dt = 3 î + (4 − 10t) ĵ.","At t = 0: v⃗ = 3 î + 4 ĵ, magnitude √(9+16) = 5 m/s at 53.1° above the x axis.","r⃗(0) = 0. r⃗(0.8) = 2.4 î + (3.2 − 3.2) ĵ = 2.4 î m.","Average velocity = 2.4 î / 0.8 = 3 î m/s.","The y motion went up and came back to zero, so it contributes nothing to the average velocity even though the particle certainly moved in y."], ans:"5 m/s at 53.1° above the x axis initially, average velocity 3 m/s along +x."}
  ],
  puzzle:{
    t:"Sweat a lot, go nowhere",
    setup:"Open the Average and instantaneous velocity simulation. It lets you set the out distance, the out speed, the return distance and the return speed independently.",
    task:"Find settings that give an average speed above 5 m/s together with an average velocity of exactly zero. Then find settings that make the average velocity negative while the particle spends most of its time moving in the positive direction.",
    hint:"Average velocity depends only on the net displacement. Average speed depends on the total path. Control them separately.",
    ans:"For the first, make the return distance equal the out distance, for example 12 m out at 8 m/s and 12 m back at 4 m/s. The average speed comes to 5.33 m/s and the average velocity is exactly 0. For the second, go out a short way fast and come back a longer way slowly: 4 m out at 10 m/s takes 0.4 s, then 10 m back at 2 m/s takes 5 s. The net displacement is −6 m over 5.4 s, an average velocity of −1.11 m/s, yet the fast outward leg is where most of the ground was covered."
  },
  funny:[
    {t:"Annual report of a human", d:"Ask students to compute their average velocity over one full year. Nearly everyone sleeps in the same bed on 1 January and 31 December, so the answer is about 0 m/s for the entire class. Have them write it into a fake performance review."},
    {t:"The boomerang salesman", d:"A shop sells only boomerangs and guarantees zero average velocity on every product. Write the warranty terms in proper physics language, including the fine print about air resistance."},
    {t:"Pacing while on the phone", d:"Film someone pacing a corridor during a phone call. Compute distance walked and net displacement. The distance is often several hundred metres and the displacement is under a metre. Report it as 'kilometres travelled, room never left'."}
  ]
},

/* =========================== 5 ============================ */
{
  slug:"acceleration", num:5, sim:"accel",
  title:"Average and instantaneous acceleration",
  tagline:"The rate at which velocity changes, not the rate at which you move.",
  summary:"Acceleration measures how fast velocity is changing, in size or in direction or both. A body can be accelerating while momentarily at rest, and it can be accelerating while its speed never changes at all.",
  keyIdeas:[
    "Average acceleration = Δv⃗ ÷ Δt, which is the slope of the chord on a velocity-time graph.",
    "Instantaneous acceleration = dv⃗/dt, the slope of the tangent on the same graph.",
    "If a and v point the same way the body speeds up. If they point opposite ways it slows down.",
    "Zero velocity does not mean zero acceleration. A ball at the top of its flight has v = 0 and a = 9.8 m/s² downward.",
    "Changing direction at constant speed is still acceleration, because velocity is a vector."
  ],
  formulas:[
    {f:"a⃗<sub>avg</sub> = (v⃗<sub>f</sub> − v⃗<sub>i</sub>) ⁄ Δt", n:"Chord slope on the v-t graph."},
    {f:"a⃗ = dv⃗/dt = d²r⃗/dt²", n:"Tangent slope, and the second derivative of position."},
    {f:"a = v²/r", n:"Magnitude of the acceleration for uniform circular motion, directed at the centre."}
  ],
  videos:[
    {t:"What acceleration actually measures", covers:"Rate of change of velocity, with the everyday word set aside.", mins:"6-8", yt:""},
    {t:"Chord and tangent on a v-t graph", covers:"Average and instantaneous acceleration read off one curve.", mins:"8-10", yt:""},
    {t:"Speeding up or slowing down", covers:"The sign rule for a and v, and why 'negative acceleration' is not a synonym for braking.", mins:"6-8", yt:""},
    {t:"At rest but accelerating", covers:"The top of a vertical throw, and why students find it counter-intuitive.", mins:"5-7", yt:""},
    {t:"Acceleration without changing speed", covers:"Turning at constant speed, leading into circular motion.", mins:"7-9", yt:""}
  ],
  examples:[
    {
      q:"A car starting from rest reaches 108 km/h in 6 s. Find its average acceleration.",
      sol:[
        "Convert: 108 km/h × 5/18 = 30 m/s.",
        "a_avg = (v_f − v_i) / Δt = (30 − 0) / 6 = 5 m/s².",
        "Note this is an average. The real engine does not deliver 5 m/s² at every instant, and the instantaneous value is usually largest in the lower gears."
      ],
      ans:"5 m/s²",
      yt:""
    },
    {
      q:"The velocity of a particle varies as v = 4t² − 2t in SI units. Find its average acceleration between t = 1 s and t = 3 s, and its instantaneous acceleration at t = 3 s.",
      sol:[
        "v(1) = 4 − 2 = 2 m/s.",
        "v(3) = 36 − 6 = 30 m/s.",
        "a_avg = (30 − 2) / (3 − 1) = 28 / 2 = 14 m/s².",
        "Differentiate: a = dv/dt = 8t − 2.",
        "At t = 3 s, a = 24 − 2 = 22 m/s².",
        "The instantaneous value exceeds the average because the acceleration itself is rising through the interval."
      ],
      ans:"Average 14 m/s², instantaneous 22 m/s².",
      yt:""
    }
  ],
  exercises:[
    {lv:"easy", q:"A body's velocity changes from 5 m/s to 25 m/s in 4 s. Find the average acceleration.", sol:["a = (25 − 5)/4 = 5."], ans:"5 m/s²"},
    {lv:"easy", q:"A car slows from 20 m/s to rest in 5 s. Find its average acceleration.", sol:["a = (0 − 20)/5 = −4.","The minus sign means the acceleration opposes the motion."], ans:"−4 m/s²"},
    {lv:"easy", q:"A body moves with uniform velocity. What is its acceleration?", sol:["Uniform velocity means the velocity vector never changes, so Δv = 0."], ans:"Zero."},
    {lv:"easy", q:"Is acceleration a scalar or a vector? State its SI unit.", sol:["It is the rate of change of a vector, so it is a vector.","Unit: m/s²."], ans:"Vector, measured in m/s²."},

    {lv:"medium", q:"A ball is thrown vertically upward. What are its velocity and its acceleration at the highest point?", sol:["At the highest point the ball has stopped rising and not yet started falling, so v = 0.","Gravity does not switch off there, so a = 9.8 m/s² directed downward throughout the flight.","This is the standard case of zero velocity with non-zero acceleration."], ans:"v = 0, a = 9.8 m/s² downward."},
    {lv:"medium", q:"A v-t graph is a straight line from (0 s, 2 m/s) to (5 s, 12 m/s). Find the acceleration and the displacement over those 5 s.", sol:["Acceleration = slope = (12 − 2)/5 = 2 m/s².","Displacement = area under the graph = ½(2 + 12)(5) = 35 m."], ans:"2 m/s² and 35 m."},
    {lv:"medium", q:"A body has u = −6 m/s and a constant a = +3 m/s². Find when it reverses direction, and state whether it is speeding up or slowing down at t = 1 s.", sol:["v = u + at = −6 + 3t, which is zero at t = 2 s, so it reverses there.","At t = 1 s, v = −3 m/s while a = +3 m/s².","v and a point in opposite directions, so the body is slowing down even though the acceleration is positive."], ans:"Reverses at t = 2 s, and it is slowing down at t = 1 s."},
    {lv:"medium", q:"A train slows uniformly from 72 km/h to 36 km/h over 200 m. Find its acceleration.", sol:["u = 20 m/s, v = 10 m/s, x = 200 m.","Use v² = u² + 2ax: 100 = 400 + 400a.","a = −300/400 = −0.75 m/s²."], ans:"−0.75 m/s²"},

    {lv:"hard", q:"The velocity of a particle is v = 3t² − 12t + 9 in SI units. Find the average acceleration between t = 0 and t = 3 s, the instantaneous acceleration at t = 2 s, and the instant at which the acceleration vanishes.", sol:["v(0) = 9 m/s and v(3) = 27 − 36 + 9 = 0.","a_avg = (0 − 9)/3 = −3 m/s².","a = dv/dt = 6t − 12, so a(2) = 12 − 12 = 0.","a = 0 when 6t = 12, that is t = 2 s. At that instant the velocity is at its minimum, v(2) = 12 − 24 + 9 = −3 m/s."], ans:"−3 m/s², 0 m/s², and a = 0 at t = 2 s."},
    {lv:"hard", q:"A particle moves around a circular track of radius 25 m at a constant speed of 10 m/s. Is it accelerating? Find the magnitude of its instantaneous acceleration, and the magnitude of its average acceleration over a quarter circle.", sol:["The speed is constant but the direction of v⃗ changes continuously, so yes, it is accelerating.","Instantaneous: a = v²/r = 100/25 = 4 m/s², directed towards the centre.","Over a quarter circle the velocity turns through 90°, so |Δv⃗| = √(10² + 10²) = 10√2 = 14.14 m/s.","Time for a quarter circle = (2πr/4)/v = (π × 25/2)/10 = 3.93 s.","|a_avg| = 14.14 / 3.93 = 3.60 m/s².","The average is smaller than the instantaneous value because the instantaneous acceleration keeps changing direction and partly cancels."], ans:"Yes. Instantaneous 4 m/s² towards the centre, average over a quarter circle 3.60 m/s²."}
  ],
  puzzle:{
    t:"Weigh yourself in a lift",
    setup:"You need a lift and either a bathroom scale or a phone with an accelerometer logging app. Stand on the scale inside the lift and start recording before the doors close.",
    task:"Record the reading through a full trip: doors close, the lift starts, it cruises, it slows, it stops. Mark the four phases on your graph. Work out the acceleration during the starting phase from the change in the scale reading, using N = m(g + a). Then predict what a downward trip will look like and test the prediction.",
    hint:"During the steady cruise the scale reads your normal weight, however fast the lift is moving.",
    ans:"Going up, the scale reads high while starting, exactly normal while cruising, and low while stopping. Going down it is the mirror image. Students almost always predict that the scale stays high for the whole upward trip, which is the misconception the experiment exists to kill: the scale responds to acceleration, not to velocity. A typical lift starts at about 1 m/s², so a 50 kg student sees roughly 55 kg during the start."
  },
  funny:[
    {t:"You cannot feel velocity", d:"Point out that a cruising aircraft moves at about 250 m/s and nobody spills their drink, while a bus pulling away at 1 m/s throws people about. Have students write an advertisement for a fictional 'anti-velocity' pill and explain why it would sell nothing."},
    {t:"Jerk is a real quantity", d:"The derivative of acceleration is genuinely called jerk, measured in m/s³. Rank the class's local bus drivers by estimated jerk, and note that comfort engineering for lifts and trains is largely about keeping jerk small."},
    {t:"The cup of water accelerometer", d:"Tape a half full cup into a toy car. The surface tilts backward under acceleration and forward under braking, and stays flat at constant velocity. Cheap, messy, and it makes the sign rule obvious in about ten seconds."}
  ]
},

/* =========================== 6 ============================ */
{
  slug:"straight-line", num:6, sim:"straight",
  title:"Motion in a straight line",
  tagline:"Three equations that cover every constant-acceleration problem you will meet.",
  summary:"When the acceleration is constant along a line, three equations describe everything: velocity against time, position against time, and velocity against position. Get the signs right and the algebra is short.",
  keyIdeas:[
    "The three equations hold only for constant acceleration. Check that before using them.",
    "Fix a positive direction first, then give u, v, a and x their signs consistently.",
    "The area under a velocity-time graph is the displacement, counting area below the axis as negative.",
    "Free fall is the same problem with a = −g if upward is positive.",
    "Displacement in the nth second is not the same thing as displacement after n seconds."
  ],
  formulas:[
    {f:"v = u + at", n:"No position term. Use it when distance is neither given nor asked for."},
    {f:"x = ut + ½at²", n:"No final velocity. Use it when v is neither given nor asked for."},
    {f:"v² = u² + 2ax", n:"No time. The workhorse for braking-distance problems."},
    {f:"s<sub>n</sub> = u + a(2n − 1)/2", n:"Displacement during the nth second alone."}
  ],
  videos:[
    {t:"Where the three equations come from", covers:"Deriving all three from the definition of acceleration and the v-t graph.", mins:"9-11", yt:""},
    {t:"Choosing signs and origin", covers:"A sign convention that survives multi-part problems, with two worked cases.", mins:"7-9", yt:""},
    {t:"Area under a v-t graph", covers:"Displacement as area, including negative area and how it changes the answer.", mins:"6-8", yt:""},
    {t:"Free fall from scratch", covers:"Throwing up, dropping, and objects thrown down, all with one sign convention.", mins:"8-10", yt:""},
    {t:"Distance in the nth second", covers:"The formula, its derivation, and the trap of confusing it with total distance.", mins:"5-7", yt:""}
  ],
  examples:[
    {
      q:"A car starts from rest and accelerates uniformly at 2 m/s² for 10 s. Find its final velocity and the distance covered.",
      sol:[
        "Given u = 0, a = 2 m/s², t = 10 s.",
        "v = u + at = 0 + 2(10) = 20 m/s.",
        "x = ut + ½at² = 0 + ½(2)(100) = 100 m.",
        "A useful check: with uniform acceleration from rest the average velocity is v/2 = 10 m/s, and 10 × 10 = 100 m, which matches."
      ],
      ans:"20 m/s and 100 m.",
      yt:""
    },
    {
      q:"A ball is thrown vertically upward with 19.6 m/s. Find the time to reach the top, the maximum height, and the total time of flight. Take g = 9.8 m/s².",
      sol:[
        "Take upward as positive, so u = +19.6 m/s and a = −9.8 m/s².",
        "At the top v = 0, so 0 = 19.6 − 9.8t, giving t = 2 s.",
        "Maximum height: v² = u² + 2ax gives 0 = 19.6² − 2(9.8)H, so H = 384.16/19.6 = 19.6 m.",
        "By symmetry the fall takes the same 2 s, so the total flight is 4 s.",
        "You can confirm the total directly: 0 = 19.6t − 4.9t² gives t(19.6 − 4.9t) = 0, so t = 0 or t = 4 s."
      ],
      ans:"2 s up, 19.6 m high, 4 s total.",
      yt:""
    }
  ],
  exercises:[
    {lv:"easy", q:"A body starts from rest with a = 4 m/s². Find its velocity and displacement after 5 s.", sol:["v = 0 + 4(5) = 20 m/s.","x = ½(4)(25) = 50 m."], ans:"20 m/s and 50 m."},
    {lv:"easy", q:"A body moving at 20 m/s decelerates uniformly at 5 m/s². When does it stop?", sol:["0 = 20 − 5t, so t = 4 s."], ans:"After 4 s."},
    {lv:"easy", q:"A stone is dropped from rest. Find its speed and the distance fallen after 3 s. Take g = 9.8 m/s².", sol:["v = gt = 9.8 × 3 = 29.4 m/s.","h = ½gt² = ½(9.8)(9) = 44.1 m."], ans:"29.4 m/s and 44.1 m."},
    {lv:"easy", q:"State the condition under which v² = u² + 2ax may be used.", sol:["The derivation assumes a does not change during the motion."], ans:"Only when the acceleration is constant and the motion is along a straight line."},

    {lv:"medium", q:"A car moving at 15 m/s brakes uniformly and stops in 25 m. Find its acceleration and the time taken.", sol:["v² = u² + 2ax: 0 = 225 + 2a(25), so a = −225/50 = −4.5 m/s².","v = u + at: 0 = 15 − 4.5t, so t = 3.33 s."], ans:"−4.5 m/s² and 3.33 s."},
    {lv:"medium", q:"A train travelling at 108 km/h decelerates uniformly and stops in 30 s. Find the distance it covers while stopping.", sol:["u = 108 × 5/18 = 30 m/s, v = 0, t = 30 s, so a = −1 m/s².","x = ut + ½at² = 30(30) − ½(1)(900) = 900 − 450 = 450 m.","Or use the average velocity: (30 + 0)/2 × 30 = 450 m."], ans:"450 m"},
    {lv:"medium", q:"A body starts with u = 2 m/s and a = 3 m/s². Find the distance covered in the 5th second.", sol:["s_n = u + a(2n − 1)/2 with n = 5.","s₅ = 2 + 3(9)/2 = 2 + 13.5 = 15.5 m.","Check: x(5) − x(4) = [10 + 37.5] − [8 + 24] = 47.5 − 32 = 15.5 m."], ans:"15.5 m"},
    {lv:"medium", q:"A stone dropped from the top of a tower reaches the ground in 4 s. Find the height of the tower and the impact speed.", sol:["h = ½gt² = ½(9.8)(16) = 78.4 m.","v = gt = 9.8(4) = 39.2 m/s."], ans:"78.4 m and 39.2 m/s."},

    {lv:"hard", q:"A ball is thrown vertically upward from the ground at 25 m/s. Find the two instants at which it is 20 m above the ground, and explain why there are two.", sol:["Take upward positive: 20 = 25t − ½(9.8)t², so 4.9t² − 25t + 20 = 0.","t = [25 ± √(625 − 392)] / 9.8 = [25 ± √233] / 9.8, and √233 = 15.26.","t = (25 − 15.26)/9.8 = 0.99 s and t = (25 + 15.26)/9.8 = 4.11 s.","There are two because the ball passes the 20 m mark once going up and once coming back down."], ans:"t ≈ 0.99 s on the way up and t ≈ 4.11 s on the way down."},
    {lv:"hard", q:"A car starts from rest with a constant acceleration of 2 m/s². At the same instant a bus moving at a constant 20 m/s overtakes it. When and where does the car catch the bus, and how fast is the car then moving?", sol:["Measure both positions from the common starting point.","Car: x_c = ½(2)t² = t². Bus: x_b = 20t.","They meet when t² = 20t, so t = 0 (the start) or t = 20 s.","Position: x = 20 × 20 = 400 m.","Car's speed then: v = 2 × 20 = 40 m/s, exactly twice the bus speed.","That factor of two is not a coincidence. Starting from rest with uniform acceleration, the average velocity is half the final one, so catching a constant-speed rival requires ending at twice its speed."], ans:"After 20 s, 400 m from the start, with the car at 40 m/s."}
  ],
  puzzle:{
    t:"Measure g with a phone camera",
    setup:"Film a ball falling past a wall on which you have stuck marks at 20 cm intervals. Use the slow-motion mode, ideally 240 frames per second, and note the frame rate.",
    task:"Step through the footage frame by frame and record the time at which the ball passes each mark. Plot fall distance against t². Fit a straight line and use h = ½gt² to extract g. Compare your value with 9.8 m/s² and account for the difference.",
    hint:"Plotting h against t gives a curve you cannot fit by eye. Plotting h against t² gives a straight line of slope g/2.",
    ans:"A careful run gives g between 9.4 and 9.9 m/s². The usual sources of error are timing resolution at low frame rates, parallax if the camera is not level with the marks, and air drag if the ball is light. A tennis ball loses noticeably more than a steel ball, which makes drag visible rather than theoretical. Repeating with both balls is the best part of the experiment."
  },
  funny:[
    {t:"The reaction-time ruler", d:"Hold a 30 cm ruler above a partner's open fingers and drop it without warning. From the distance it falls before they catch it, t = √(2h/g). Most people land between 0.15 and 0.25 s. Then repeat while they are texting, and watch the number get worse."},
    {t:"Braking distance versus tailgating", d:"Compute stopping distance at 40, 60 and 100 km/h using v² = u² + 2ax with a realistic a = −7 m/s², and mark the results out on the corridor floor with tape. The 100 km/h mark is usually further down the corridor than students expect."},
    {t:"Guess the nth second", d:"Run a game where a body starts from rest at 1 m/s² and students must shout the distance covered in the nth second before the timer. The answers 0.5, 1.5, 2.5, 3.5 form an obvious pattern, and the class discovers the odd-number rule on its own."}
  ]
},

/* =========================== 7 ============================ */
{
  slug:"motion-in-a-plane", num:7, sim:"plane",
  title:"Motion in a plane",
  tagline:"Two one-dimensional problems running side by side, sharing a clock.",
  summary:"Two-dimensional motion is not a new theory. Resolve everything into perpendicular components and each component obeys exactly the equations you already know. The only thing the two axes share is the time.",
  keyIdeas:[
    "The x motion and the y motion are independent. Nothing that happens along x can change what happens along y.",
    "The two components share one clock, and that is the only link between them.",
    "A vector is fully specified by its components, or equally by its magnitude and direction.",
    "For constant acceleration the vector equations v⃗ = u⃗ + a⃗t and r⃗ = u⃗t + ½a⃗t² hold component by component.",
    "The velocity vector is always tangent to the path."
  ],
  formulas:[
    {f:"r⃗ = x î + y ĵ &nbsp;&nbsp;|&nbsp;&nbsp; |r⃗| = √(x² + y²)", n:"Position from components, and back again."},
    {f:"v⃗ = u⃗ + a⃗t &nbsp;&nbsp;|&nbsp;&nbsp; r⃗ = u⃗t + ½a⃗t²", n:"The straight-line equations, applied to each axis at once."},
    {f:"tanθ = A<sub>y</sub> ⁄ A<sub>x</sub>", n:"Direction of a vector from its components. Watch the quadrant."}
  ],
  videos:[
    {t:"Components and resultants", covers:"Resolving a vector, adding two vectors, and getting back to magnitude and direction.", mins:"8-10", yt:""},
    {t:"Independence of perpendicular motions", covers:"The classic two-coin demonstration, explained and then justified algebraically.", mins:"6-8", yt:""},
    {t:"Position, velocity and acceleration as vectors", covers:"Differentiating a vector function, one component at a time.", mins:"7-9", yt:""},
    {t:"Uniform velocity in two dimensions", covers:"Why zero acceleration always gives a straight-line path, whatever the direction.", mins:"5-7", yt:""},
    {t:"Constant acceleration in two dimensions", covers:"Worked problems where a⃗ is not along the initial velocity, giving a curved path.", mins:"9-11", yt:""}
  ],
  examples:[
    {
      q:"A particle starts from the origin with velocity 3î + 4ĵ m/s and no acceleration. Find its position after 5 s, its distance from the origin, and its speed.",
      sol:[
        "With a⃗ = 0 the velocity is constant, so r⃗ = v⃗t.",
        "r⃗ = 5(3î + 4ĵ) = 15î + 20ĵ m.",
        "Distance from the origin = √(15² + 20²) = √625 = 25 m.",
        "Speed = |v⃗| = √(3² + 4²) = 5 m/s, unchanged throughout because nothing accelerates the particle.",
        "As a check, 5 m/s for 5 s gives 25 m, which matches the straight-line path."
      ],
      ans:"r⃗ = 15î + 20ĵ m, 25 m from the origin, speed 5 m/s.",
      yt:""
    },
    {
      q:"A body starts from the origin with u⃗ = 4î m/s and moves with constant a⃗ = 2ĵ m/s². Find its position and velocity at t = 3 s, and the angle the velocity makes with the x axis.",
      sol:[
        "Handle each axis separately. Along x: uₓ = 4, aₓ = 0, so x = 4(3) = 12 m and vₓ = 4 m/s.",
        "Along y: u_y = 0, a_y = 2, so y = ½(2)(9) = 9 m and v_y = 2(3) = 6 m/s.",
        "Position: r⃗ = 12î + 9ĵ m, which is 15 m from the origin.",
        "Velocity: v⃗ = 4î + 6ĵ m/s, magnitude √(16 + 36) = √52 = 7.21 m/s.",
        "Angle: tanθ = 6/4 = 1.5, so θ = 56.3° above the x axis.",
        "The path curves even though the acceleration is constant, because a⃗ is not parallel to u⃗."
      ],
      ans:"r⃗ = 12î + 9ĵ m, v⃗ = 4î + 6ĵ m/s of magnitude 7.21 m/s at 56.3° to the x axis.",
      yt:""
    }
  ],
  exercises:[
    {lv:"easy", q:"Find the magnitude of the vector 6î + 8ĵ.", sol:["√(36 + 64) = √100 = 10."], ans:"10"},
    {lv:"easy", q:"Resolve a velocity of 20 m/s directed at 30° above the horizontal into its components.", sol:["vₓ = 20 cos 30° = 20 × 0.866 = 17.32 m/s.","v_y = 20 sin 30° = 10 m/s."], ans:"17.32 m/s horizontal and 10 m/s vertical."},
    {lv:"easy", q:"Two perpendicular displacements of 5 m and 12 m are applied one after the other. Find the resultant displacement.", sol:["√(25 + 144) = √169 = 13 m.","Direction: tanθ = 12/5, so θ = 67.4° from the 5 m leg."], ans:"13 m, at 67.4° from the 5 m leg."},
    {lv:"easy", q:"A ball is projected horizontally while a second ball is dropped from the same height at the same instant. Which lands first?", sol:["The vertical motions are identical: both start with zero vertical velocity and both fall under the same g.","The horizontal velocity of the first ball has no vertical component and so cannot affect its fall."], ans:"Neither. They land together."},

    {lv:"medium", q:"A particle has velocity v⃗ = 3î − 4ĵ m/s. Find its speed and the direction of motion.", sol:["Speed = √(9 + 16) = 5 m/s.","tanθ = −4/3, and with a positive x component and a negative y component the vector lies in the fourth quadrant.","θ = 53.1° below the +x axis."], ans:"5 m/s, at 53.1° below the +x axis."},
    {lv:"medium", q:"A boat heads due north at 4 m/s relative to the water of a river 80 m wide that flows due east at 3 m/s. Find the boat's velocity relative to the bank, the time to cross, and how far downstream it lands.", sol:["Resultant velocity = √(4² + 3²) = 5 m/s, at tan⁻¹(3/4) = 36.9° east of north.","The crossing depends only on the northward component: t = 80/4 = 20 s. The current has no northward component, so it cannot speed up or slow down the crossing.","Drift = 3 × 20 = 60 m east."], ans:"5 m/s at 36.9° east of north, 20 s, landing 60 m downstream."},
    {lv:"medium", q:"For r⃗ = 2t î + 3t² ĵ in SI units, find the velocity and acceleration at t = 2 s.", sol:["v⃗ = dr⃗/dt = 2î + 6t ĵ, so at t = 2, v⃗ = 2î + 12ĵ m/s of magnitude √148 = 12.17 m/s.","a⃗ = dv⃗/dt = 6ĵ m/s², constant and along +y."], ans:"v⃗ = 2î + 12ĵ m/s (12.17 m/s), a⃗ = 6ĵ m/s²."},
    {lv:"medium", q:"A particle starts from rest with a constant acceleration a⃗ = 2î + 3ĵ m/s². Find its speed and its distance from the start after 4 s.", sol:["v⃗ = a⃗t = 8î + 12ĵ m/s, so the speed is √(64 + 144) = √208 = 14.42 m/s.","r⃗ = ½a⃗t² = ½(16)(2î + 3ĵ) = 16î + 24ĵ m.","|r⃗| = √(256 + 576) = √832 = 28.84 m."], ans:"14.42 m/s, and 28.84 m from the start."},

    {lv:"hard", q:"A body moves in a plane with u⃗ = −2î + 6ĵ m/s and constant a⃗ = 4î − 2ĵ m/s². Find (a) when its velocity is parallel to the x axis, (b) its position at that instant if it starts at the origin, and (c) its speed at t = 4 s.", sol:["v⃗ = u⃗ + a⃗t = (−2 + 4t)î + (6 − 2t)ĵ.","(a) Parallel to the x axis means the y component vanishes: 6 − 2t = 0, so t = 3 s. There v⃗ = 10î m/s.","(b) x = −2(3) + ½(4)(9) = −6 + 18 = 12 m, and y = 6(3) + ½(−2)(9) = 18 − 9 = 9 m, so r⃗ = 12î + 9ĵ m.","(c) At t = 4: v⃗ = 14î − 2ĵ m/s, speed = √(196 + 4) = √200 = 14.14 m/s.","Notice the body first moves in the −x direction, turns around, and by t = 4 s is well into positive x."], ans:"(a) t = 3 s, (b) 12î + 9ĵ m, (c) 14.14 m/s."},
    {lv:"hard", q:"A particle has r⃗ = (t² − 2t) î + 3t ĵ in SI units. Find the instant at which its velocity is perpendicular to its acceleration, and its speed then.", sol:["v⃗ = (2t − 2)î + 3ĵ and a⃗ = 2î m/s², constant.","Perpendicular vectors have zero dot product: v⃗ · a⃗ = 2(2t − 2) + 0 = 0.","So 2t − 2 = 0, giving t = 1 s.","At t = 1, v⃗ = 3ĵ m/s, so the speed is 3 m/s.","At that instant the particle is moving purely along y while being pushed purely along x, which is the moment its x motion reverses."], ans:"t = 1 s, with a speed of 3 m/s."}
  ],
  puzzle:{
    t:"The two-coin drop",
    setup:"You need two identical coins and a table with a straight edge. Place one coin at the very edge. Hold a ruler flat and use it to flick the second coin horizontally off the table while it simultaneously knocks the first coin straight down.",
    task:"Listen, do not watch. Record the sound on a phone and inspect the waveform. Do the two coins land at the same instant? Repeat with a much harder flick so the second coin flies twice as far. Explain your result using components.",
    hint:"Ask which component of the flick has anything at all to do with falling.",
    ans:"They land together every time, and the waveform shows one combined click rather than two. The flick adds horizontal velocity only, and horizontal velocity has no vertical component, so it cannot change the fall. Doubling the flick doubles the horizontal range and leaves the fall time untouched. This is the single cleanest demonstration in the whole chapter, and it takes about thirty seconds to set up."
  },
  funny:[
    {t:"The bullet and the dropped bullet", d:"A bullet fired horizontally and a bullet dropped from the same height hit the ground together, ignoring air resistance and the curvature of the Earth. Stage it with two tennis balls and a plank launcher. Nobody believes it until they see it."},
    {t:"Cats and the independence of axes", d:"Show slow-motion footage of a cat jumping to a shelf and have students trace the horizontal and vertical components separately. The horizontal trace is a straight line at constant speed, which surprises people who assumed the cat was steering mid-air."},
    {t:"Escape the maze with vectors only", d:"Give students a grid maze and let them issue only vector instructions such as 3î + 2ĵ, with no words. Errors in quadrant and sign show up instantly as a walk into a wall."}
  ]
},

/* =========================== 8 ============================ */
{
  slug:"projectile-motion", num:8, sim:"projectile",
  title:"Projectile motion",
  tagline:"Constant speed sideways, constant acceleration downward, and a parabola comes out.",
  summary:"A projectile has no horizontal acceleration and a constant downward vertical acceleration of g. Every result in this section, the range, the time of flight, the maximum height, follows from those two statements and nothing else.",
  keyIdeas:[
    "Horizontal velocity stays at u cosθ for the whole flight, ignoring air resistance.",
    "Vertical motion is ordinary free fall with initial velocity u sinθ.",
    "At the highest point the vertical velocity is zero, but the speed is not, and the acceleration is still g downward.",
    "For a level launch, θ and (90° − θ) give the same range. The range is largest at 45°.",
    "Launching from a height breaks the up-down symmetry, so the standard range formula no longer applies."
  ],
  formulas:[
    {f:"T = 2u sinθ ⁄ g", n:"Time of flight for a launch and landing at the same height."},
    {f:"H = u²sin²θ ⁄ (2g)", n:"Maximum height above the launch point."},
    {f:"R = u² sin2θ ⁄ g", n:"Horizontal range, level ground only. Maximum at θ = 45°."},
    {f:"y = x tanθ − gx² ⁄ (2u²cos²θ)", n:"The path itself. It is a parabola, since y is quadratic in x."}
  ],
  videos:[
    {t:"Splitting the launch velocity", covers:"Getting u cosθ and u sinθ right, and never mixing them again.", mins:"6-8", yt:""},
    {t:"Deriving T, H and R", covers:"All three from the vertical equation, in one continuous derivation.", mins:"9-11", yt:""},
    {t:"Why 45° wins, and why 30° ties with 60°", covers:"The sin 2θ result, read off a graph of range against angle.", mins:"7-9", yt:""},
    {t:"Projectiles from a height", covers:"Solving the quadratic properly, and why symmetry arguments fail here.", mins:"8-10", yt:""},
    {t:"Horizontal projection", covers:"The θ = 0 special case, from a table edge to a cliff.", mins:"6-8", yt:""}
  ],
  examples:[
    {
      q:"A ball is projected at 20 m/s at 30° to the horizontal from level ground. Find the time of flight, the maximum height and the range. Take g = 9.8 m/s².",
      sol:[
        "Components: uₓ = 20 cos 30° = 17.32 m/s and u_y = 20 sin 30° = 10 m/s.",
        "Time of flight: T = 2u_y/g = 20/9.8 = 2.04 s.",
        "Maximum height: H = u_y²/(2g) = 100/19.6 = 5.10 m.",
        "Range: R = uₓ × T = 17.32 × 2.04 = 35.35 m.",
        "Check with the formula: R = u² sin 2θ / g = 400 × sin 60° / 9.8 = 400 × 0.866 / 9.8 = 35.35 m."
      ],
      ans:"T = 2.04 s, H = 5.10 m, R = 35.35 m.",
      yt:""
    },
    {
      q:"A ball is thrown horizontally at 15 m/s from the top of a 45 m cliff. Find the time to reach the ground, the horizontal distance covered, and the speed and direction on impact.",
      sol:[
        "Vertically the ball starts with zero velocity, so 45 = ½(9.8)t².",
        "t² = 90/9.8 = 9.184, giving t = 3.03 s.",
        "Horizontal distance = 15 × 3.03 = 45.5 m.",
        "On impact v_y = gt = 9.8 × 3.03 = 29.7 m/s downward, while vₓ is still 15 m/s.",
        "Speed = √(15² + 29.7²) = √(225 + 882) = 33.3 m/s.",
        "Direction: tanα = 29.7/15 = 1.98, so α = 63.2° below the horizontal."
      ],
      ans:"3.03 s, 45.5 m horizontally, striking at 33.3 m/s at 63.2° below the horizontal.",
      yt:""
    }
  ],
  exercises:[
    {lv:"easy", q:"A projectile is launched at 20 m/s at 45° over level ground. Find its range. Take g = 9.8 m/s².", sol:["R = u² sin 2θ / g = 400 × sin 90° / 9.8 = 400/9.8 = 40.8 m."], ans:"40.8 m"},
    {lv:"easy", q:"Does the horizontal velocity of a projectile change during flight? Explain in one line.", sol:["Gravity acts vertically, so there is no horizontal force and no horizontal acceleration."], ans:"No, it stays constant at u cosθ."},
    {lv:"easy", q:"What are the velocity and the acceleration of a projectile at its highest point?", sol:["The vertical component has fallen to zero but the horizontal component is untouched, so the velocity is u cosθ, horizontal.","The acceleration is unchanged: 9.8 m/s² downward."], ans:"Velocity u cosθ horizontally, acceleration 9.8 m/s² downward."},
    {lv:"easy", q:"A stone is projected at 14 m/s vertically upward. Find its time of flight and maximum height.", sol:["This is the θ = 90° case. T = 2u/g = 28/9.8 = 2.86 s.","H = u²/(2g) = 196/19.6 = 10 m."], ans:"2.86 s and 10 m."},

    {lv:"medium", q:"A ball is projected at 30 m/s at 60° from level ground. Find the time of flight and the maximum height.", sol:["u_y = 30 sin 60° = 25.98 m/s.","T = 2(25.98)/9.8 = 5.30 s.","H = 25.98²/(2 × 9.8) = 675/19.6 = 34.44 m."], ans:"5.30 s and 34.44 m."},
    {lv:"medium", q:"Show that projectiles launched at 30° and at 60° with the same speed have the same range over level ground.", sol:["R = u² sin 2θ / g.","At 30°: sin 60° = 0.866. At 60°: sin 120° = 0.866.","They are equal because sin 2θ = sin(180° − 2θ), which is exactly the statement that θ and 90° − θ pair up.","The 60° shot goes much higher and stays up much longer, but it moves more slowly sideways, and the two effects cancel exactly."], ans:"Equal, because sin 60° = sin 120°."},
    {lv:"medium", q:"A ball is thrown at 40 m/s at 30°. Find its velocity 1 s after launch.", sol:["vₓ = 40 cos 30° = 34.64 m/s, unchanged.","v_y = 40 sin 30° − 9.8(1) = 20 − 9.8 = 10.2 m/s.","Speed = √(34.64² + 10.2²) = √(1200 + 104) = 36.1 m/s.","Angle = tan⁻¹(10.2/34.64) = 16.4° above the horizontal."], ans:"36.1 m/s at 16.4° above the horizontal."},
    {lv:"medium", q:"The maximum range of a projectile for a given launch speed is 100 m. Find that speed and the maximum height reached when the range is maximum.", sol:["Maximum range occurs at 45°, where R_max = u²/g.","u² = 100 × 9.8 = 980, so u = 31.3 m/s.","At 45°, H = u² sin²45° /(2g) = 980 × 0.5 / 19.6 = 25 m.","In general H = R_max/4 when the range is maximum."], ans:"31.3 m/s, with a maximum height of 25 m."},

    {lv:"hard", q:"A projectile is launched at 20 m/s at 60° from a platform 15 m above level ground. Find the total time of flight, the horizontal range, and the impact speed.", sol:["Components: uₓ = 10 m/s and u_y = 17.32 m/s. Take upward positive with the origin at the launch point, so the ground is at y = −15 m.","−15 = 17.32t − 4.9t², so 4.9t² − 17.32t − 15 = 0.","t = [17.32 ± √(300 + 294)] / 9.8 = [17.32 ± 24.37] / 9.8, and only the positive root is physical: t = 4.25 s.","Range = 10 × 4.25 = 42.5 m.","On impact v_y = 17.32 − 9.8(4.25) = −24.37 m/s, so the speed = √(10² + 24.37²) = √694 = 26.3 m/s.","Check by energy: v² = u² + 2gh = 400 + 2(9.8)(15) = 694, which matches exactly."], ans:"4.25 s, a range of 42.5 m, striking at 26.3 m/s."},
    {lv:"hard", q:"A projectile is launched over level ground so that its horizontal range is three times its maximum height. Find the angle of projection.", sol:["Set R = 3H: u² sin 2θ / g = 3 u² sin²θ / (2g).","The u² and g cancel: sin 2θ = 1.5 sin²θ.","Use sin 2θ = 2 sinθ cosθ: 2 sinθ cosθ = 1.5 sin²θ.","Divide by sinθ, which is non-zero for a real launch: 2 cosθ = 1.5 sinθ.","tanθ = 4/3, so θ = 53.13°.","In general R = 4H cotθ, and setting that equal to 3H reproduces tanθ = 4/3 in one line."], ans:"53.13°"}
  ],
  puzzle:{
    t:"Find 45° with a water jet",
    setup:"A garden hose, a squeeze bottle or a large syringe, plus chalk or tape to mark where the water lands. Keep the pressure as steady as you can, which is easiest with a hose at a fixed tap setting.",
    task:"Fire the jet at 15°, 30°, 45°, 60° and 75°, holding the nozzle at the same height and the same pressure each time. Mark and measure every landing point. Plot range against angle. Which pairs of angles land together, and where is the peak?",
    hint:"Two of your five angles should give almost the same range. Which pair adds to 90°?",
    ans:"The 30° and 60° shots land at nearly the same distance, as do 15° and 75°, and the peak sits at 45°. Real jets peak slightly below 45° because air drag punishes the slower, higher-arcing shots more heavily, and because the nozzle is above ground level rather than at it. Both effects are worth discussing, since they are the reason athletes throw at closer to 40° than 45°."
  },
  funny:[
    {t:"Audit a video game", d:"Screen-record a projectile in any game with visible arcs, step through frames, and measure whether the horizontal velocity really stays constant. Many games get it right, and a few use a fake arc that fails the test immediately."},
    {t:"The paper aeroplane heresy", d:"Ask why a paper plane does not follow a parabola. It generates lift, so the vertical acceleration is not g and the whole chapter's assumptions collapse. A good way to make students state their assumptions out loud."},
    {t:"Basketball at 45 degrees", d:"Have students shoot only at 45° for a whole practice. It feels wrong, and it is: the hoop is above launch height and must be entered steeply, so the best angle is nearer 52°. Optimising for range is not the same as optimising for scoring."}
  ]
},

/* =========================== 9 ============================ */
{
  slug:"change-of-frame", num:9, sim:"frame",
  title:"Change of frame",
  tagline:"Subtract the observer's velocity from everything and the problem gets easier.",
  summary:"Moving to another observer's frame means subtracting that observer's velocity from every velocity in the problem. Chosen well, a change of frame turns a two-body chase into a one-body question, which is why river-boat and overtaking problems collapse to one line.",
  keyIdeas:[
    "v⃗(A/B) = v⃗(A/G) − v⃗(B/G), where G is the ground frame.",
    "v⃗(A/B) = −v⃗(B/A). Swapping the observer reverses the relative velocity.",
    "In B's frame, B is at rest by definition, and everything else including the ground moves at −v⃗(B/G).",
    "For a river crossing, the current cannot change the crossing time when you aim straight across, because it has no component across the river.",
    "For overtaking, the relevant distance is the sum of the two lengths and the relevant speed is the relative speed."
  ],
  formulas:[
    {f:"v⃗<sub>A/B</sub> = v⃗<sub>A</sub> − v⃗<sub>B</sub>", n:"The one equation this whole section rests on."},
    {f:"v<sub>rel</sub> = v₁ − v₂ (same direction), v₁ + v₂ (opposite)", n:"The one-dimensional shortcut, once signs are fixed."},
    {f:"sinθ = v<sub>river</sub> ⁄ v<sub>boat</sub>", n:"Upstream heading needed to land directly opposite. Only possible if v_boat > v_river."}
  ],
  videos:[
    {t:"Relative velocity on a line", covers:"Same direction and opposite direction, handled by one signed subtraction.", mins:"6-8", yt:""},
    {t:"Relative velocity as vector subtraction", covers:"Drawing v⃗_A − v⃗_B properly, including the tip-to-tail trap.", mins:"7-9", yt:""},
    {t:"River and boat problems", covers:"Shortest time against shortest path, and why they give different headings.", mins:"9-11", yt:""},
    {t:"Rain and umbrella problems", covers:"Getting the umbrella angle right, and what changes when you turn around.", mins:"6-8", yt:""},
    {t:"Overtaking, crossing and closest approach", covers:"Using the relative frame to reduce two moving bodies to one.", mins:"9-11", yt:""}
  ],
  examples:[
    {
      q:"Train A moves east at 20 m/s and train B moves west at 15 m/s on parallel tracks. Find the velocity of A relative to B and of B relative to A.",
      sol:[
        "Take east as positive, so v_A = +20 m/s and v_B = −15 m/s.",
        "v(A/B) = v_A − v_B = 20 − (−15) = +35 m/s, that is 35 m/s east.",
        "v(B/A) = v_B − v_A = −15 − 20 = −35 m/s, that is 35 m/s west.",
        "A passenger in B sees A approach and recede at 35 m/s, which is why passing trains feel so violent even at modest speeds."
      ],
      ans:"35 m/s east, and 35 m/s west respectively.",
      yt:""
    },
    {
      q:"Rain falls vertically at 10 m/s. A man runs east at 6 m/s. Find the velocity of the rain relative to him, and the angle at which he must tilt his umbrella.",
      sol:[
        "Take east as î and upward as ĵ. Rain: v⃗_r = −10ĵ m/s. Man: v⃗_m = 6î m/s.",
        "v⃗(rain/man) = v⃗_r − v⃗_m = −6î − 10ĵ m/s.",
        "Magnitude = √(36 + 100) = √136 = 11.66 m/s.",
        "Angle from the vertical: tanθ = 6/10 = 0.6, so θ = 31.0°.",
        "The relative velocity points backwards and downward, so the rain appears to come at him from the front. He must tilt the umbrella 31.0° forward, into his direction of running."
      ],
      ans:"11.66 m/s at 31.0° from the vertical, so the umbrella tilts 31.0° forward.",
      yt:""
    }
  ],
  exercises:[
    {lv:"easy", q:"Two cars travel in the same direction at 25 m/s and 15 m/s. Find their relative speed.", sol:["25 − 15 = 10 m/s."], ans:"10 m/s"},
    {lv:"easy", q:"The same two cars now travel towards each other at 25 m/s and 15 m/s. Find their relative speed.", sol:["Take one direction positive: 25 − (−15) = 40 m/s."], ans:"40 m/s"},
    {lv:"easy", q:"If v(A/B) = +5 m/s, what is v(B/A)?", sol:["v(B/A) = −v(A/B)."], ans:"−5 m/s"},
    {lv:"easy", q:"Two trains run side by side at exactly 30 m/s in the same direction. How does each appear to a passenger in the other?", sol:["v(A/B) = 30 − 30 = 0."], ans:"At rest, while the ground rushes past at 30 m/s."},

    {lv:"medium", q:"A boat travels at 5 m/s in still water on a river flowing at 3 m/s. Find its downstream and upstream speeds relative to the bank, and the time for a 40 m trip each way.", sol:["Downstream: 5 + 3 = 8 m/s, so t = 40/8 = 5 s.","Upstream: 5 − 3 = 2 m/s, so t = 40/2 = 20 s.","The round trip takes 25 s, an average speed of 80/25 = 3.2 m/s, well below the still-water 5 m/s."], ans:"8 m/s and 2 m/s, taking 5 s and 20 s."},
    {lv:"medium", q:"A 100 m train moving at 20 m/s overtakes a 150 m train moving at 15 m/s in the same direction. How long does the overtaking take?", sol:["Work in the frame of the slower train, where the faster one approaches at 20 − 15 = 5 m/s.","Overtaking starts when the front of the fast train meets the rear of the slow one and ends when its rear clears the front, so the distance is 100 + 150 = 250 m.","t = 250/5 = 50 s."], ans:"50 s"},
    {lv:"medium", q:"Rain falls vertically at 8 m/s while a cyclist rides at 6 m/s. At what angle to the vertical should the umbrella be held, and in which direction?", sol:["In the cyclist's frame the rain gains a horizontal component of 6 m/s opposite to the ride.","tanθ = 6/8 = 0.75, so θ = 36.9° from the vertical.","The tilt is forward, into the direction of riding."], ans:"36.9° from the vertical, tilted forward."},
    {lv:"medium", q:"Particle A moves east at 4 m/s and particle B moves north at 3 m/s. Find the velocity of A relative to B.", sol:["v⃗_A = 4î, v⃗_B = 3ĵ.","v⃗(A/B) = 4î − 3ĵ m/s.","Magnitude = √(16 + 9) = 5 m/s, at tan⁻¹(3/4) = 36.9° south of east."], ans:"5 m/s at 36.9° south of east."},

    {lv:"hard", q:"Ship A is 20 km due north of ship B. A sails east at 10 km/h and B sails north at 10 km/h. Find their closest approach and when it occurs.", sol:["Put B at the origin, so A starts at (0, 20) km.","v⃗(A/B) = 10î − 10ĵ km/h. In B's frame, B stands still and A drifts with this velocity.","Relative position at time t: r⃗ = (10t, 20 − 10t) km.","|r⃗|² = 100t² + (20 − 10t)² = 200t² − 400t + 400.","This is minimised where its derivative vanishes: 400t − 400 = 0, so t = 1 h.","|r⃗|² = 200 − 400 + 400 = 200, so the closest approach is √200 = 14.1 km.","Working in the ground frame would need two moving positions at once. The relative frame reduces it to one point drifting in a straight line."], ans:"14.1 km, one hour after the start."},
    {lv:"hard", q:"A man swims at 4 km/h in still water and must cross a river 1 km wide flowing at 3 km/h. Find (a) the minimum crossing time and the resulting drift, and (b) the heading needed to land directly opposite, with the time that takes.", sol:["(a) The crossing time depends only on the component of his velocity across the river, so it is smallest when he points his whole 4 km/h straight across.","t = 1/4 h = 15 min. During that time the current carries him 3 × 0.25 = 0.75 km downstream.","(b) To land directly opposite, the upstream component of his swimming must cancel the current: 4 sinθ = 3, so sinθ = 0.75 and θ = 48.6° upstream of the perpendicular.","The across-river component is then 4 cosθ = √(16 − 9) = √7 = 2.65 km/h.","t = 1/2.65 = 0.378 h = 22.7 min.","Landing opposite costs almost 8 extra minutes. There is no heading that achieves both the shortest time and the shortest path."], ans:"(a) 15 min with a drift of 0.75 km, (b) 48.6° upstream, taking 22.7 min."}
  ],
  puzzle:{
    t:"Walk nowhere on a travelator",
    setup:"An airport travelator, a gym treadmill or a long escalator will do. You also need a stopwatch and a fixed landmark beside the belt.",
    task:"First measure the belt's speed by riding it without walking and timing a known length. Then walk backwards along it and adjust your pace until you hold position exactly against the landmark. Record how you feel, then state your velocity in three frames: the belt, the ground, and a person walking past on the floor beside you.",
    hint:"Holding position against the landmark means your ground-frame velocity is zero. That fixes your belt-frame velocity immediately.",
    ans:"When you hold position, your velocity is zero in the ground frame and equal in size but opposite in direction to the belt speed in the belt frame. A typical travelator runs at about 0.7 m/s, so you are walking at 0.7 m/s backwards relative to the belt. To someone walking past at 1.4 m/s you are receding at 1.4 m/s. Three frames, three different answers, one unchanged person. The tiring part is that your muscles respond to your motion relative to the belt, which is the only frame in which you are working."
  },
  funny:[
    {t:"Who overtook whom", d:"Two students walk down a corridor at slightly different speeds while a third films from a moving skateboard. Play the footage back and let the class argue over who overtook whom. Every account is correct in its own frame, which is the point."},
    {t:"The stationary jogger", d:"Film someone jogging on a treadmill from a phone strapped to the treadmill frame, then from a tripod on the floor. Same person, same effort, two completely different videos. Use it to define what a camera actually measures."},
    {t:"Relative velocity dating advice", d:"Frame the classic line about two people moving at the same velocity seeing each other at rest as a physics greetings card. Deeply corny, and students remember v(A/B) = 0 for years afterwards."}
  ]
}

];
